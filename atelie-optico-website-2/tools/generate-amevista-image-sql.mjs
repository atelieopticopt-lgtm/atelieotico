import fs from 'node:fs/promises'
import path from 'node:path'

const input=path.resolve(process.argv[2]||'supabase/amevista-catalogue-audit.json')
const output=path.resolve(process.argv[3]||'supabase/amevista-catalogue-images.sql')
const audit=JSON.parse((await fs.readFile(input,'utf8')).replace(/^\uFEFF/,''))
const matches=(audit.results||[]).filter(row=>row.status==='matched'&&row.image)
const quote=value=>`'${String(value??'').replaceAll("'","''")}'`
const statements=matches.map(row=>`insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, ${quote(row.image)}, ${quote(row.title||row.name)}, 0
from public.products p
where p.sku = ${quote(row.sku)}
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;`)
const sql=`-- Exact Amevista matches only. Generated ${new Date().toISOString()}.
-- ${matches.length} product cover images. Run after schema.sql and import-pvp.sql.
begin;

${statements.join('\n\n')}

commit;
`
await fs.writeFile(output,sql)
console.log(`Wrote ${matches.length} verified images to ${output}`)
