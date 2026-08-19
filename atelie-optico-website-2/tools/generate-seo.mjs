import { readdir, stat, writeFile, mkdir, readFile } from 'node:fs/promises'
import { join, relative, dirname, sep } from 'node:path'

const root = process.cwd()
const pages = join(root, 'src', 'pages')
const output = join(root, 'public')
const site = (process.env.SITE_URL || 'https://atelieotico.pt').replace(/\/$/, '')
const excluded = new Set(['/admin/','/carrinho/','/finalizar-compra/','/minha-conta/','/favoritos/'])

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await walk(path))
    else if (entry.name === 'index.astro') files.push(path)
  }
  return files
}

const files = await walk(pages)
const urls = []
for (const file of files) {
  const folder = relative(pages, dirname(file)).split(sep).join('/')
  const path = folder ? `/${folder}/` : '/'
  if (path.includes('[') || excluded.has(path) || path.startsWith('/admin/')) continue
  const info = await stat(file)
  urls.push({ path, modified: info.mtime.toISOString().slice(0,10) })
}
try {
  const products = JSON.parse(await readFile(join(output, 'data', 'amevista-products.json'), 'utf8'))
  const modified = new Date().toISOString().slice(0,10)
  for (const product of products) if (product?.slug) urls.push({ path: `/produto/${product.slug}/`, modified })
} catch {}
urls.sort((a,b)=>a.path.localeCompare(b.path,'pt'))
const escape = (value) => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({path,modified})=>`  <url><loc>${escape(site+path)}</loc><lastmod>${modified}</lastmod></url>`).join('\n')}\n</urlset>\n`
const agents=['Googlebot','Google-Extended','GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-SearchBot','Claude-User','PerplexityBot','Perplexity-User','Applebot-Extended','CCBot','Bytespider','Amazonbot','*']
const robots=agents.map(agent=>`User-Agent: ${agent}\nAllow: /`).join('\n\n')+`\n\nDisallow: /admin/\nSitemap: ${site}/sitemap.xml\n`
await mkdir(output,{recursive:true})
await writeFile(join(output,'sitemap.xml'),sitemap)
await writeFile(join(output,'robots.txt'),robots)
console.log(`Generated sitemap.xml with ${urls.length} public URLs.`)
