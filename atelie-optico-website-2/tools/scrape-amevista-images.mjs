import fs from 'node:fs/promises'
import path from 'node:path'
import { PDFParse } from 'pdf-parse'

const pdfPath = process.argv.find(a=>a.toLowerCase().endsWith('.pdf')) || 'C:/Users/enman/Downloads/Folha de cálculo sem nome - Folha1.pdf'
const limit = Number(process.argv.find(a=>a.startsWith('--limit='))?.split('=')[1] || 100)
const outPath = process.argv.find(a=>a.startsWith('--out='))?.split('=')[1] || 'supabase/amevista-product-images.sql'
const sleep = ms => new Promise(r=>setTimeout(r,ms))
const slugify = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const sql = value => `'${String(value??'').replaceAll("'","''")}'`

function catalogueRows(text){
  const lines=text.split(/\r?\n/), rows=[]
  for(let i=0;i<lines.length;i++){
    const m=lines[i].match(/^(.+?)\s+\t(.+?)\s+\t(-?\d+)\s+\t([\d,.]+)\s+(?:Arma|Sol)/i)
    if(!m)continue
    const brand=m[1].trim(), raw=m[2].trim().replace(/\s+/g,' '), pvp=Number(m[4].replace(',','.'))
    let code=(lines[i].match(/\t(\d{8,})\s*$/)||[])[1]
    if(!code){for(let j=i+1;j<Math.min(i+4,lines.length);j++){const c=lines[j].trim().match(/^\d{8,}$/);if(c){code=c[0];break}}}
    const name=raw.replace(/\s+\.?\s*\d{2}\s*[- ]\s*\d{2}(?:\s*[- ]\s*\d{2,3})?\s*\.?\s*$/,'').replace(/\s+\.\s*$/,'').trim()
    if(code&&name)rows.push({brand,name,pvp,sku:code})
  }
  return rows
}

async function fetchProduct(row){
  const url=`https://www.amevista.com/pt/${slugify(row.name)}`
  const response=await fetch(url,{headers:{'user-agent':'Mozilla/5.0 (compatible; AtelieOpticoCatalogue/1.0)'}})
  if(!response.ok)return null
  const html=await response.text(), title=html.match(/<h1[^>]*class="product-title"[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()
  const image=html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)?.[1]
  const listed=Number((html.match(/"price"\s*:\s*"?([\d.]+)/i)||[])[1])
  if(!image||!title)return null
  const needle=slugify(row.name), found=slugify(title)
  if(!(found.includes(needle)||needle.includes(found)))return null
  return {...row,title,image,url,amevistaPrice:Number.isFinite(listed)?listed:null}
}

const parser=new PDFParse({data:await fs.readFile(pdfPath)}), parsed=await parser.getText(); await parser.destroy()
const rows=catalogueRows(parsed.text), selected=rows.slice(0,limit), matches=[]
for(let i=0;i<selected.length;i+=4){
  const chunk=selected.slice(i,i+4)
  const found=await Promise.all(chunk.map(r=>fetchProduct(r).catch(()=>null)))
  matches.push(...found.filter(Boolean)); process.stdout.write(`\rChecked ${Math.min(i+4,selected.length)}/${selected.length}; matched ${matches.length}`); await sleep(250)
}
const statements=matches.map((m,index)=>`insert into public.product_images(product_id,image_url,alt_text,source_url,position) select id,${sql(m.image)},${sql(m.title)},${sql(m.url)},0 from public.products where sku=${sql(m.sku)} on conflict(product_id,image_url) do update set alt_text=excluded.alt_text,source_url=excluded.source_url;`).join('\n')
await fs.mkdir(path.dirname(outPath),{recursive:true});await fs.writeFile(outPath,`-- Generated from ${path.basename(pdfPath)}; ${matches.length}/${selected.length} exact model matches.\n${statements}\n`)
await fs.writeFile(outPath.replace(/\.sql$/i,'.json'),JSON.stringify({generatedAt:new Date().toISOString(),checked:selected.length,matches},null,2))
console.log(`\nWrote ${matches.length} verified matches to ${outPath}`)
