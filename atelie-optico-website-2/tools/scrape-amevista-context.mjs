import fs from 'node:fs/promises'
import path from 'node:path'

const args = Object.fromEntries(process.argv.slice(2).filter(value => value.startsWith('--')).map(value => {
  const [key, ...rest] = value.slice(2).split('=')
  return [key, rest.join('=') || true]
}))

const projectRoot = process.cwd()
const envPath = path.resolve(projectRoot, String(args.env || '.env'))
const outPath = path.resolve(projectRoot, String(args.out || 'supabase/amevista-context-images.sql'))
const targetUrl = String(args.url || '')
const sku = String(args.sku || '')
const expectedName = String(args.name || '')

if (!targetUrl || !/^https:\/\/www\.amevista\.com\/pt\/[a-z0-9-]+\/?$/i.test(targetUrl)) {
  throw new Error('Use --url=https://www.amevista.com/pt/<produto>')
}
if (!sku) throw new Error('Use --sku=<SKU do produto no Supabase>')

function parseEnv(contents) {
  return Object.fromEntries(contents.split(/\r?\n/).flatMap(line => {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/)
    if (!match || match[1].startsWith('#')) return []
    return [[match[1], match[2].replace(/^(['"])(.*)\1$/, '$2')]]
  }))
}

const env = parseEnv(await fs.readFile(envPath, 'utf8'))
const apiKey = env.CONTEXT_API_KEY || env.CONTEXT_DEV_API_KEY
if (!apiKey) throw new Error('CONTEXT_API_KEY não existe no .env')

const normalize = value => String(value || '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const sql = value => `'${String(value ?? '').replaceAll("'", "''")}'`
const modelFromUrl = new URL(targetUrl).pathname.split('/').filter(Boolean).at(-1)?.replaceAll('-', ' ') || ''
const expected = normalize(expectedName || modelFromUrl)
const importantTokens = expected.split(' ').filter(token => token.length >= 3 && !['set'].includes(token))

const response = await fetch(`https://api.context.dev/v1/web/scrape/images?url=${encodeURIComponent(targetUrl)}`, {
  headers: { Authorization: `Bearer ${apiKey}` }
})
if (!response.ok) throw new Error(`Context.dev respondeu ${response.status}: ${await response.text()}`)

const payload = await response.json()
const images = Array.isArray(payload.images) ? payload.images : []
const matches = images.filter(image => {
  if (image?.type !== 'url' || !/^https?:\/\//i.test(image.src || '')) return false
  if (!/\/image\/foto\//i.test(image.src)) return false
  const alt = normalize(image.alt)
  return alt && importantTokens.every(token => alt.includes(token))
}).filter((image, index, all) => all.findIndex(candidate => candidate.src === image.src) === index)

if (!matches.length) {
  throw new Error(`Nenhuma fotografia exata encontrada para "${expectedName || modelFromUrl}". Nada foi importado.`)
}

const resolvedName = matches[0].alt?.trim() || expectedName || modelFromUrl
const statements = matches.map((image, position) =>
  `insert into public.product_images (product_id, image_url, alt_text, source_url, position)\n` +
  `select id, ${sql(image.src)}, ${sql(resolvedName)}, ${sql(targetUrl)}, ${position}\n` +
  `from public.products where sku = ${sql(sku)}\n` +
  `on conflict (product_id, image_url) do update set alt_text = excluded.alt_text, source_url = excluded.source_url, position = excluded.position;`
).join('\n\n')

const header = `-- Context.dev + Amevista: correspondência exata verificada\n-- Produto: ${resolvedName}\n-- Origem: ${targetUrl}\n-- Fotografias: ${matches.length}\n\n`
await fs.mkdir(path.dirname(outPath), { recursive: true })
await fs.writeFile(outPath, header + statements + '\n')
await fs.writeFile(outPath.replace(/\.sql$/i, '.json'), JSON.stringify({
  generatedAt: new Date().toISOString(), sku, name: resolvedName, sourceUrl: targetUrl,
  images: matches.map((image, position) => ({ imageUrl: image.src, altText: resolvedName, position }))
}, null, 2) + '\n')

console.log(`Verified ${matches.length} exact product image(s).`)
console.log(`SQL: ${outPath}`)
