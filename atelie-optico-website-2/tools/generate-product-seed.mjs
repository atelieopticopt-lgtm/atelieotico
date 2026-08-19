import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cheerio from 'cheerio'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CONTENT = join(ROOT, 'src', 'content')
const OUT = join(ROOT, 'supabase', 'seed-products.sql')
const quote = (value) => value == null || value === '' ? 'null' : `'${String(value).replaceAll("'", "''")}'`

const files = (await readdir(CONTENT)).filter((name) => name.startsWith('produto__') && name.endsWith('.page')).sort()
const rows = []
for (const file of files) {
  const $ = cheerio.load(await readFile(join(CONTENT, file), 'utf8'))
  const slug = file.slice('produto__'.length, -'.page'.length)
  const name = $('h1.product_title').first().text().trim() || $('title').text().split('–')[0].trim()
  const sku = $('.sku_wrapper .sku').first().text().trim() || null
  rows.push({ sku, slug, name })
}

const duplicates = new Set()
const seen = new Set()
for (const row of rows) {
  if (!row.sku) continue
  if (seen.has(row.sku)) duplicates.add(row.sku)
  seen.add(row.sku)
}
for (const row of rows) if (duplicates.has(row.sku)) row.sku = null

const values = rows.map((row) => `  (${quote(row.sku)}, ${quote(row.slug)}, ${quote(row.name)})`).join(',\n')
const sql = `-- Generated from the Portuguese product pages. Safe to run repeatedly.\n` +
`insert into public.products (sku, slug, name) values\n${values}\n` +
`on conflict (slug) do update set\n` +
`  sku = coalesce(excluded.sku, public.products.sku),\n` +
`  name = excluded.name,\n` +
`  updated_at = now();\n`

await mkdir(join(ROOT, 'supabase'), { recursive: true })
await writeFile(OUT, sql)
console.log(`Generated ${rows.length} products in supabase/seed-products.sql`)
if (duplicates.size) console.log(`Duplicate SKUs omitted: ${[...duplicates].join(', ')}`)
