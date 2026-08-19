import fs from 'node:fs/promises'
import path from 'node:path'

const args=Object.fromEntries(process.argv.slice(2).filter(v=>v.startsWith('--')).map(v=>{const[k,...r]=v.slice(2).split('=');return[k,r.join('=')||true]}))
const input=path.resolve(String(args.input||'supabase/import-pvp.sql'))
const output=path.resolve(String(args.out||'supabase/amevista-catalogue-audit.json'))
const concurrency=Math.max(1,Math.min(12,Number(args.concurrency||6)))
const timeoutMs=Math.max(5000,Number(args.timeout||18000))
const requestDelay=Math.max(0,Number(args.delay||0))
const retryUnmatched=Boolean(args['retry-unmatched'])
let contextKey=''
if(args.context){
  const envText=await fs.readFile(path.resolve(String(args.env||'.env')),'utf8')
  contextKey=envText.match(/^\s*(?:CONTEXT_API_KEY|CONTEXT_DEV_API_KEY)\s*=\s*["']?([^\r\n"']+)/m)?.[1]?.trim()||''
  if(!contextKey)throw new Error('CONTEXT_API_KEY is missing from .env')
}
let publishedSlugs=null,publishedIndex=null
if(args.urls){
  const urls=JSON.parse((await fs.readFile(path.resolve(String(args.urls)),'utf8')).replace(/^\uFEFF/,''))
  publishedSlugs=new Set((Array.isArray(urls)?urls:urls.urls||[]).map(value=>{try{return new URL(value).pathname.split('/').filter(Boolean).at(-1)}catch{return null}}).filter(Boolean))
  publishedIndex=new Map()
  for(const slug of publishedSlugs)for(const token of slug.split('-').filter(token=>/[a-z]/.test(token)&&/\d/.test(token)&&token.length>=5)){
    if(!publishedIndex.has(token))publishedIndex.set(token,[])
    publishedIndex.get(token).push(slug)
  }
}
const slugify=v=>String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const normalize=v=>slugify(v).replaceAll('-',' ')
const unquote=v=>v.replaceAll("''", "'")

function parseRows(sql){
  const rows=[];const re=/\('((?:[^']|'')*)',\s*'((?:[^']|'')*)',\s*'((?:[^']|'')*)',\s*(null|-?\d+(?:\.\d+)?),\s*'([A-Z]{3})'\)/g
  for(const m of sql.matchAll(re))rows.push({sku:unquote(m[1]),slug:unquote(m[2]),name:unquote(m[3]),pvp:m[4]==='null'?null:Number(m[4]),currency:m[5]})
  return rows
}
function candidateNames(name){
  let cleaned=name.replace(/^\d+(?=[A-Za-zÀ-ÿ])/,'').replace(/(?:\s+\.)+\s*$/,'').replace(/\s+/g,' ').trim()
  const variants=new Set([cleaned])
  variants.add(cleaned.replace(/\s+\d{2}(?:[- ]\d{2})?(?:\/\d{2,3})?(?:[- ]\d{2,3})?\s*$/,''))
  variants.add(cleaned.replace(/\s+N\s+(?=[A-Z0-9]*\d)/i,' '))
  variants.add(cleaned.replace(/\s+N\s+(?=[A-Z0-9]*\d)/i,' ').replace(/\s+\d{2}(?:[- ]\d{2})?(?:\/\d{2,3})?(?:[- ]\d{2,3})?\s*$/,''))
  return [...variants].map(v=>v.replace(/\s+/g,' ').trim()).filter(Boolean)
}
function identityTokens(name){
  const tokens=normalize(name).split(' ').filter(Boolean),strong=tokens.filter(t=>/[a-z]/.test(t)&&/\d/.test(t)&&t.length>=5)
  return strong.length?strong:tokens.filter(t=>t.length>=4&&!['oculos','armacao','optic','optico'].includes(t)).slice(0,3)
}
function exactTitle(expected,title){const found=normalize(title),tokens=identityTokens(expected);return tokens.length>0&&tokens.every(t=>found.includes(t))}
function decode(value=''){return value.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#039;|&apos;/g,"'")}
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms))
async function fetchPage(url){if(requestDelay)await sleep(requestDelay);for(let attempt=0;attempt<3;attempt++){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeoutMs);try{const response=await fetch(url,{signal:controller.signal,headers:{'user-agent':'Mozilla/5.0 (compatible; AtelieOpticoCatalogue/2.0)'}});if(response.status===429){await sleep(2500*(attempt+1));continue}if(!response.ok)return null;const html=await response.text();const title=decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim());const image=decode(html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i)?.[1]||html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1]||'');return title&&image?{title,image}:null}finally{clearTimeout(timer)}}return null}
async function fetchContextPage(url,row){
  if(!contextKey)return null
  const response=await fetch(`https://api.context.dev/v1/web/scrape/images?url=${encodeURIComponent(url)}`,{headers:{Authorization:`Bearer ${contextKey}`}})
  if(!response.ok)return null
  const payload=await response.json(),images=Array.isArray(payload.images)?payload.images:[]
  const exact=images.find(image=>image?.type==='url'&&/\/image\/foto\//i.test(image.src||'')&&exactTitle(row.name,image.alt||''))
  return exact?{title:exact.alt||row.name,image:exact.src}:null
}
function candidateSlugs(row){
  const direct=candidateNames(row.name).map(slugify).filter(slug=>!publishedSlugs||publishedSlugs.has(slug))
  if(!publishedIndex)return direct
  const normalized=slugify(row.name),tokens=normalized.split('-'),models=tokens.filter(token=>/[a-z]/.test(token)&&/\d/.test(token)&&token.length>=5)
  const indexed=[]
  for(const model of models){
    const modelUrls=publishedIndex.get(model)||[]
    const modelAt=tokens.indexOf(model),qualifiers=tokens.slice(modelAt+1).filter(token=>/^\d{2,3}$/.test(token)||/^c?\d{2,3}$/.test(token)).slice(0,1)
    const narrowed=qualifiers.length?modelUrls.filter(slug=>qualifiers.every(token=>slug.split('-').includes(token))):modelUrls
    if(narrowed.length===1)indexed.push(narrowed[0])
    else if(narrowed.length>1)indexed.push(...narrowed.slice(0,8))
  }
  return [...new Set([...direct,...indexed])]
}
async function scrape(row){const candidates=candidateSlugs(row);if(!candidates.length)return{...row,status:'not-in-sitemap'};for(const slug of candidates){const url=`https://www.amevista.com/pt/${slug}`;try{const page=await fetchPage(url);if(page&&exactTitle(row.name,page.title))return{...row,title:page.title,image:page.image,url,status:'matched'}}catch{}}if(contextKey&&candidates.length===1){const url=`https://www.amevista.com/pt/${candidates[0]}`;try{const page=await fetchContextPage(url,row);if(page)return{...row,title:page.title,image:page.image,url,status:'matched-context'}}catch{}}return{...row,status:candidates.length===1?'unmatched':'ambiguous',candidateCount:candidates.length}}

const rows=parseRows(await fs.readFile(input,'utf8'))
let prior={results:[]};try{prior=JSON.parse(await fs.readFile(output,'utf8'))}catch{}
const bySku=new Map((prior.results||[]).map(r=>[r.sku,r])),queue=rows.filter(r=>!bySku.has(r.sku)||(retryUnmatched&&bySku.get(r.sku)?.status!=='matched'))
let cursor=0,done=rows.length-queue.length
async function worker(){while(cursor<queue.length){const row=queue[cursor++],result=await scrape(row);bySku.set(row.sku,result);done++;if(done%20===0||done===rows.length){const results=rows.map(r=>bySku.get(r.sku)).filter(Boolean);await fs.mkdir(path.dirname(output),{recursive:true});await fs.writeFile(output,JSON.stringify({generatedAt:new Date().toISOString(),sourceRows:rows.length,matched:results.filter(r=>r.status==='matched').length,unmatched:results.filter(r=>r.status!=='matched').length,results},null,2));console.log(`${done}/${rows.length} checked; ${results.filter(r=>r.status==='matched').length} exact matches`)}}}
await Promise.all(Array.from({length:concurrency},worker))
const results=rows.map(r=>bySku.get(r.sku)),matches=results.filter(r=>r.status==='matched'||r.status==='matched-context')
const manifest=matches.map((m,index)=>({id:'',sku:m.sku,slug:m.slug,name:m.name,pvp:m.pvp,currency:m.currency,description:null,display_order:index,product_images:[{id:`scraped-${m.sku}`,image_url:m.image,alt_text:m.title,position:0}]}))
await fs.writeFile(output.replace(/\.json$/i,'-storefront.json'),JSON.stringify(manifest,null,2)+'\n')
console.log(`Complete: ${matches.length}/${rows.length} exact matches; ${rows.length-matches.length} unavailable or ambiguous.`)
