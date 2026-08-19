-- Context.dev + Amevista: correspondência exata verificada
-- Produto: Zeiss ZS23138LPMAG-SET 203
-- Origem: https://www.amevista.com/pt/zeiss-zs23138lpmag-set-203
-- Fotografias: 1

insert into public.product_images (product_id, image_url, alt_text, source_url, position)
select id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895625258.jpg', 'Zeiss ZS23138LPMAG-SET 203', 'https://www.amevista.com/pt/zeiss-zs23138lpmag-set-203', 0
from public.products where sku = '1209648801022'
on conflict (product_id, image_url) do update set alt_text = excluded.alt_text, source_url = excluded.source_url, position = excluded.position;
