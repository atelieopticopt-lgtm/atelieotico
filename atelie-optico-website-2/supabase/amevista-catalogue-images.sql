-- Exact Amevista matches only. Generated 2026-08-11T23:38:02.746Z.
-- 370 product cover images. Run after schema.sql and import-pvp.sql.
begin;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895783552.jpg', 'Calvin Klein CK26105T 716', 0
from public.products p
where p.sku = '1209648801140'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901163483.jpg', 'Calvin Klein CK24513 200', 0
from public.products p
where p.sku = '1209648801123'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901169775.jpg', 'Calvin Klein CK24533S 001', 0
from public.products p
where p.sku = '1209643200494'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901188103.jpg', 'Calvin Klein CK20527 N 270', 0
from public.products p
where p.sku = '1209648801071'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901176810.jpg', 'Calvin Klein CK23527N 005', 0
from public.products p
where p.sku = '1209648801072'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901176827.jpg', 'Calvin Klein CK23527N 030', 0
from public.products p
where p.sku = '1209648801073'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901181043.jpg', 'Calvin Klein CK23527N 300', 0
from public.products p
where p.sku = '1209648801075'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901168020.jpg', 'Calvin Klein CK24545 616', 0
from public.products p
where p.sku = '1209648801076'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901177053.jpg', 'Calvin Klein CK25111S 025', 0
from public.products p
where p.sku = '1209643200460'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901177077.jpg', 'Calvin Klein CK25111S 601', 0
from public.products p
where p.sku = '1209643200462'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901162714.jpg', 'Calvin Klein CK24507S 338', 0
from public.products p
where p.sku = '1209643200469'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901182606.jpg', 'Calvin Klein CK19119 N 235', 0
from public.products p
where p.sku = '1209648801081'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901169218.jpg', 'Calvin Klein CK19119 781', 0
from public.products p
where p.sku = '1209648801082'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901168297.jpg', 'Calvin Klein CK24538S 001', 0
from public.products p
where p.sku = '1209643200473'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901174144.jpg', 'Calvin Klein CK25518 235', 0
from public.products p
where p.sku = '1209648801049'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901183504.jpg', 'Calvin Klein CK25518 N 209', 0
from public.products p
where p.sku = '1209648801048'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901177572.jpg', 'Calvin Klein CK25542 001', 0
from public.products p
where p.sku = '1209648801051'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901177589.jpg', 'Calvin Klein CK25542 235', 0
from public.products p
where p.sku = '1209648801052'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901190052.jpg', 'Calvin Klein CK26512 605', 0
from public.products p
where p.sku = '1209648801054'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901189995.jpg', 'Calvin Klein CK26513 240', 0
from public.products p
where p.sku = '1209648801055'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901190014.jpg', 'Calvin Klein CK26513 618', 0
from public.products p
where p.sku = '1209648801056'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901190335.jpg', 'Calvin Klein CK26516 605', 0
from public.products p
where p.sku = '1209648801058'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901193176.jpg', 'Calvin Klein CK26519 001', 0
from public.products p
where p.sku = '1209648801059'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901172225.jpg', 'Calvin Klein CK25100S 045', 0
from public.products p
where p.sku = '1209643200476'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901182583.jpg', 'Calvin Klein CK19119 N 045', 0
from public.products p
where p.sku = '1209648801077'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901182590.jpg', 'Calvin Klein CK19119 N 213', 0
from public.products p
where p.sku = '1209648801078'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901182576.jpg', 'Calvin Klein CK19119 N 025', 0
from public.products p
where p.sku = '1209648801080'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901179477.jpg', 'Calvin Klein CK25538S 001', 0
from public.products p
where p.sku = '1209643200510'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901169218.jpg', 'Calvin Klein CK19119 781', 0
from public.products p
where p.sku = '1209648800903'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901176322.jpg', 'Calvin Klein CK24550MAG-SET 242', 0
from public.products p
where p.sku = '1209648800830'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901171952.jpg', 'Calvin Klein CK25105 605', 0
from public.products p
where p.sku = '1209648800665'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901172010.jpg', 'Calvin Klein CK25106 400', 0
from public.products p
where p.sku = '1209648800667'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895682893.jpg', 'Calvin Klein CK25107 002', 0
from public.products p
where p.sku = '1209648800668'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901172256.jpg', 'Calvin Klein CK25503S 001', 0
from public.products p
where p.sku = '1209643200322'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901172270.jpg', 'Calvin Klein CK25503S 235', 0
from public.products p
where p.sku = '1209643200323'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901172287.jpg', 'Calvin Klein CK25503S 435', 0
from public.products p
where p.sku = '1209643200324'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901174007.jpg', 'Calvin Klein CK25512 605', 0
from public.products p
where p.sku = '1209648800671'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901174038.jpg', 'Calvin Klein CK25516 260', 0
from public.products p
where p.sku = '1209648800702'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901174229.jpg', 'Calvin Klein CK5864N 970', 0
from public.products p
where p.sku = '1209648800703'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901174045.jpg', 'Calvin Klein CK25516 605', 0
from public.products p
where p.sku = '1209648800704'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901167948.jpg', 'Calvin Klein CK24547 438', 0
from public.products p
where p.sku = '1209648800713'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901169140.jpg', 'Calvin Klein CK19119 025', 0
from public.products p
where p.sku = '1209648800619'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901169171.jpg', 'Calvin Klein CK19119 235', 0
from public.products p
where p.sku = '1209648800621'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901139051.jpg', 'Calvin Klein CK21524 001', 0
from public.products p
where p.sku = '1209648800626'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901158977.jpg', 'Calvin Klein CK23129 002', 0
from public.products p
where p.sku = '1209648800629'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901159004.jpg', 'Calvin Klein CK23129 430', 0
from public.products p
where p.sku = '1209648800630'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901153842.jpg', 'Calvin Klein CK23516 200', 0
from public.products p
where p.sku = '1209648800631'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901163629.jpg', 'Calvin Klein CK24103 235', 0
from public.products p
where p.sku = '1209648800636'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//aerialvision/883901163636.jpg', 'Calvin Klein CK24103 300', 0
from public.products p
where p.sku = '1209648800637'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901165913.jpg', 'Calvin Klein CK24512S 109', 0
from public.products p
where p.sku = '1209643200318'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901168464.jpg', 'Calvin Klein CK24543 240', 0
from public.products p
where p.sku = '1209648800654'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//aerialvision/883901175189.jpg', 'Calvin Klein CK24543 278', 0
from public.products p
where p.sku = '1209648800655'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//aerialvision/883901168488.jpg', 'Calvin Klein CK24543 515', 0
from public.products p
where p.sku = '1209648800656'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901171839.jpg', 'Calvin Klein CK25103 771', 0
from public.products p
where p.sku = '1209648800662'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901169119.jpg', 'Calvin Klein CK19119 001', 0
from public.products p
where p.sku = '1209648800314'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901116847.jpg', 'Calvin Klein CK19119 410', 0
from public.products p
where p.sku = '1209648800317'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901159257.jpg', 'Calvin Klein CK23549 342', 0
from public.products p
where p.sku = '1209648800347'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901163131.jpg', 'Calvin Klein CK24506S 300', 0
from public.products p
where p.sku = '1209643200111'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901163032.jpg', 'Calvin Klein CK24522 539', 0
from public.products p
where p.sku = '1209648800370'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901152210.jpg', 'Calvin Klein CK23515 001', 0
from public.products p
where p.sku = '1209648800379'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901142365.jpg', 'Calvin Klein CK22508 001', 0
from public.products p
where p.sku = '1209648800401'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901142396.jpg', 'Calvin Klein CK22508 431', 0
from public.products p
where p.sku = '1209648800403'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901151466.jpg', 'Calvin Klein CK23500S 601', 0
from public.products p
where p.sku = '1209643200140'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901131512.jpg', 'Calvin Klein CK20527 405', 0
from public.products p
where p.sku = '1209648800450'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901148152.jpg', 'Calvin Klein CK22533S 220', 0
from public.products p
where p.sku = '1209643200170'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901122657.jpg', 'Calvin Klein CK19569 001', 0
from public.products p
where p.sku = '1209648800457'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901168723.jpg', 'Calvin Klein CK24551MAG-SET 001', 0
from public.products p
where p.sku = '1209648800463'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901168747.jpg', 'Calvin Klein CK24551MAG-SET 206', 0
from public.products p
where p.sku = '1209648800465'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901171891.jpg', 'Calvin Klein CK25104 718', 0
from public.products p
where p.sku = '1209648800854'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901169195.jpg', 'Calvin Klein CK19119 717', 0
from public.products p
where p.sku = '1209648800240'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901169201.jpg', 'Calvin Klein CK19119 780', 0
from public.products p
where p.sku = '1209648800244'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901122664.jpg', 'Calvin Klein CK19569 210', 0
from public.products p
where p.sku = '1209648800246'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901172621.jpg', 'Calvin Klein CK25101S 240', 0
from public.products p
where p.sku = '1209643200459'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901182613.jpg', 'Calvin Klein CK19119 N 717', 0
from public.products p
where p.sku = '1209648801079'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901171945.jpg', 'Calvin Klein CK25105 035', 0
from public.products p
where p.sku = '1209648800664'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901163469.jpg', 'Calvin Klein CK24513 005', 0
from public.products p
where p.sku = '1209648800645'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901163476.jpg', 'Calvin Klein CK24513 031', 0
from public.products p
where p.sku = '1209648800646'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901171938.jpg', 'Calvin Klein CK25105 001', 0
from public.products p
where p.sku = '1209648800663'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901139082.jpg', 'Calvin Klein CK21524 438', 0
from public.products p
where p.sku = '1209648800271'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901172812.jpg', 'Calvin Klein CKJ25200S 002', 0
from public.products p
where p.sku = '1209643200517'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901128017.jpg', 'Calvin Klein CKJ20705S 001', 0
from public.products p
where p.sku = '1209643200521'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901185485.jpg', 'Calvin Klein CKJ20705S N 702', 0
from public.products p
where p.sku = '1209643200522'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901179422.jpg', 'Calvin Klein CKJ25628 605', 0
from public.products p
where p.sku = '1209648801124'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901179415.jpg', 'Calvin Klein CKJ25628 272', 0
from public.products p
where p.sku = '1209648801065'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901172799.jpg', 'Calvin Klein CKJ25202S 014', 0
from public.products p
where p.sku = '1209643200456'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901124095.jpg', 'Calvin Klein CKJ20101 272', 0
from public.products p
where p.sku = '1209648801044'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901124712.jpg', 'Calvin Klein CKJ20101 645', 0
from public.products p
where p.sku = '1209648801045'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901188936.jpg', 'Calvin Klein CKJ26205 309', 0
from public.products p
where p.sku = '1209648801061'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901180664.jpg', 'Calvin Klein CKJ25210 002', 0
from public.products p
where p.sku = '1209648801062'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901180688.jpg', 'Calvin Klein CKJ25210 027', 0
from public.products p
where p.sku = '1209648801064'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901186505.jpg', 'Calvin Klein CKJ23202S N 770', 0
from public.products p
where p.sku = '1209643200407'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901174434.jpg', 'Calvin Klein CKJ25603S 002', 0
from public.products p
where p.sku = '1209643200401'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901165197.jpg', 'Calvin Klein CKJ24304 500', 0
from public.products p
where p.sku = '1209648800707'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901165326.jpg', 'Calvin Klein CKJ24305 300', 0
from public.products p
where p.sku = '1209648800716'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901149050.jpg', 'Calvin Klein CKJ22646 432', 0
from public.products p
where p.sku = '1209648800323'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901148909.jpg', 'Calvin Klein CKJ22644 002', 0
from public.products p
where p.sku = '1209648800321'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901170061.jpg', 'Calvin Klein CKJ24636MAG-SET 210', 0
from public.products p
where p.sku = '1209648800491'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901124101.jpg', 'Calvin Klein CKJ20101 431', 0
from public.products p
where p.sku = '1209648800310'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883901152296.jpg', 'Calvin Klein CKJ23202S 210', 0
from public.products p
where p.sku = '1209643200090'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895676281.jpg', 'Salvatore Ferragamo SF2066S 232', 0
from public.products p
where p.sku = '1209643200516'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895632676.jpg', 'Salvatore Ferragamo SF2983 320', 0
from public.products p
where p.sku = '1209648801147'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895678544.jpg', 'Salvatore Ferragamo SF3023 613', 0
from public.products p
where p.sku = '1209648801148'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895678537.jpg', 'Salvatore Ferragamo SF3023 454', 0
from public.products p
where p.sku = '1209648801149'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895680455.jpg', 'Salvatore Ferragamo SF2058SE 320', 0
from public.products p
where p.sku = '1209643200528'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895680479.jpg', 'Salvatore Ferragamo SF2058SE 612', 0
from public.products p
where p.sku = '1209643200529'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895610261.jpg', 'Salvatore Ferragamo SF1102S 261', 0
from public.products p
where p.sku = '1209643200530'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895705745.jpg', 'Salvatore Ferragamo SF1102S 619', 0
from public.products p
where p.sku = '1209643200531'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895708487.jpg', 'Salvatore Ferragamo SF3045 219', 0
from public.products p
where p.sku = '1209648801023'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895727631.jpg', 'Salvatore Ferragamo SF2109S 655', 0
from public.products p
where p.sku = '1209643200453'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895727662.jpg', 'Salvatore Ferragamo SF2110S 320', 0
from public.products p
where p.sku = '1209643200454'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895707947.jpg', 'Salvatore Ferragamo SF3046 245', 0
from public.products p
where p.sku = '1209648801025'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895728041.jpg', 'Salvatore Ferragamo SF2605 002', 0
from public.products p
where p.sku = '1209648801026'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895728058.jpg', 'Salvatore Ferragamo SF2605 071', 0
from public.products p
where p.sku = '1209648801027'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895728478.jpg', 'Salvatore Ferragamo SF3059 025', 0
from public.products p
where p.sku = '1209648801029'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895735001.jpg', 'Salvatore Ferragamo SF3062 612', 0
from public.products p
where p.sku = '1209648801030'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895792660.jpg', 'Salvatore Ferragamo SF2111S 001', 0
from public.products p
where p.sku = '1209643200448'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895660761.jpg', 'Salvatore Ferragamo SF3013 317', 0
from public.products p
where p.sku = '1209648801040'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895678193.jpg', 'Salvatore Ferragamo SF2596 021', 0
from public.products p
where p.sku = '1209648800921'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895707961.jpg', 'Salvatore Ferragamo SF3046 618', 0
from public.products p
where p.sku = '1209648800954'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//aerialvision/886895657198.jpg', 'Salvatore Ferragamo SF2036S 001', 0
from public.products p
where p.sku = '1209643200425'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895708494.jpg', 'Salvatore Ferragamo SF3045 232', 0
from public.products p
where p.sku = '1209648800960'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895688635.jpg', 'Salvatore Ferragamo SF2237 710', 0
from public.products p
where p.sku = '1209648800780'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895653138.jpg', 'Salvatore Ferragamo SF3006 020', 0
from public.products p
where p.sku = '1209648800807'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895678186.jpg', 'Salvatore Ferragamo SF2596 018', 0
from public.products p
where p.sku = '1209648800920'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900114110.jpg', 'Karl Lagerfeld KL365S 714', 0
from public.products p
where p.sku = '1209643200514'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900110464.jpg', 'Karl Lagerfeld KL6187S 001', 0
from public.products p
where p.sku = '1209643200515'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900114141.jpg', 'Karl Lagerfeld KL6222S 450', 0
from public.products p
where p.sku = '1209643200519'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900115032.jpg', 'Karl Lagerfeld KL6233 001', 0
from public.products p
where p.sku = '1209648801141'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900115063.jpg', 'Karl Lagerfeld KL6233 601', 0
from public.products p
where p.sku = '1209648801142'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900114264.jpg', 'Karl Lagerfeld KL368 605', 0
from public.products p
where p.sku = '1209648801122'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900114684.jpg', 'Karl Lagerfeld KL6234 501', 0
from public.products p
where p.sku = '1209643200451'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900114264.jpg', 'Karl Lagerfeld KL368 605', 0
from public.products p
where p.sku = '1209648801033'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900114301.jpg', 'Karl Lagerfeld KL369 773', 0
from public.products p
where p.sku = '1209648801035'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900114356.jpg', 'Karl Lagerfeld KL6220S 001', 0
from public.products p
where p.sku = '1209643200455'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900114998.jpg', 'Karl Lagerfeld KL6232 001', 0
from public.products p
where p.sku = '1209648801036'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900115025.jpg', 'Karl Lagerfeld KL6232 600', 0
from public.products p
where p.sku = '1209648801037'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900114707.jpg', 'Karl Lagerfeld KL6235 020', 0
from public.products p
where p.sku = '1209648801038'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900114738.jpg', 'Karl Lagerfeld KL6235 601', 0
from public.products p
where p.sku = '1209648801039'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900114462.jpg', 'Karl Lagerfeld KL6226S 422', 0
from public.products p
where p.sku = '1209643200507'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900114905.jpg', 'Karl Lagerfeld KL6229 013', 0
from public.products p
where p.sku = '1209648801144'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900110204.jpg', 'Karl Lagerfeld KL356 264', 0
from public.products p
where p.sku = '1209648800959'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900110518.jpg', 'Karl Lagerfeld KL6191 016', 0
from public.products p
where p.sku = '1209648800828'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900109291.jpg', 'Karl Lagerfeld KL354 601', 0
from public.products p
where p.sku = '1209648800758'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900109284.jpg', 'Karl Lagerfeld KL354 242', 0
from public.products p
where p.sku = '1209648800757'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900110228.jpg', 'Karl Lagerfeld KL356 638', 0
from public.products p
where p.sku = '1209648800760'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900110600.jpg', 'Karl Lagerfeld KL6193 600', 0
from public.products p
where p.sku = '1209648800800'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900111270.jpg', 'Karl Lagerfeld KL6194 001', 0
from public.products p
where p.sku = '1209648800801'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900101110.jpg', 'Karl Lagerfeld KL316 710', 0
from public.products p
where p.sku = '1209648800170'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900101127.jpg', 'Karl Lagerfeld KL316 714', 0
from public.products p
where p.sku = '1209648800171'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/883900105521.jpg', 'Karl Lagerfeld KL343 714', 0
from public.products p
where p.sku = '1209648800179'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//aerialvision/883900106085.jpg', 'Karl Lagerfeld KL345 600', 0
from public.products p
where p.sku = '1209648800181'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895791069.jpg', 'Lacoste L3664 035', 0
from public.products p
where p.sku = '1209648801126'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895791090.jpg', 'Lacoste L3664 615', 0
from public.products p
where p.sku = '1209648801128'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895788113.jpg', 'Lacoste L3669 001', 0
from public.products p
where p.sku = '1209648801129'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895788120.jpg', 'Lacoste L3669 410', 0
from public.products p
where p.sku = '1209648801130'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895788137.jpg', 'Lacoste L3669 615', 0
from public.products p
where p.sku = '1209648801131'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895787567.jpg', 'Lacoste L3666 615', 0
from public.products p
where p.sku = '1209648801136'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895788038.jpg', 'Lacoste L3667 035', 0
from public.products p
where p.sku = '1209648801137'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895788045.jpg', 'Lacoste L3667 400', 0
from public.products p
where p.sku = '1209648801138'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895699709.jpg', 'Lacoste L2311 750', 0
from public.products p
where p.sku = '1209648801043'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895776981.jpg', 'Lacoste L6090S 232', 0
from public.products p
where p.sku = '1209643200503'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895755849.jpg', 'Lacoste L2876 N 275', 0
from public.products p
where p.sku = '1209648800904'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895693585.jpg', 'Lacoste L6063S 038', 0
from public.products p
where p.sku = '1209643200400'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895636353.jpg', 'Lacoste L2946 219', 0
from public.products p
where p.sku = '1209648800839'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//aerialvision/886895690744.jpg', 'Lacoste L2308 033', 0
from public.products p
where p.sku = '1209648800762'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895690751.jpg', 'Lacoste L2308 035', 0
from public.products p
where p.sku = '1209648800763'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895701624.jpg', 'Lacoste L3114 424', 0
from public.products p
where p.sku = '1209648800770'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895701631.jpg', 'Lacoste L3114 601', 0
from public.products p
where p.sku = '1209648800771'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895701723.jpg', 'Lacoste L3661 317', 0
from public.products p
where p.sku = '1209648800772'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895701730.jpg', 'Lacoste L3661 424', 0
from public.products p
where p.sku = '1209648800773'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895693325.jpg', 'Lacoste L6053S 001', 0
from public.products p
where p.sku = '1209643200368'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895693578.jpg', 'Lacoste L6063S 001', 0
from public.products p
where p.sku = '1209643200372'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895690768.jpg', 'Lacoste L2308 410', 0
from public.products p
where p.sku = '1209648800784'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895691208.jpg', 'Lacoste L2978 275', 0
from public.products p
where p.sku = '1209648800793'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895691307.jpg', 'Lacoste L2980 275', 0
from public.products p
where p.sku = '1209648800795'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895664899.jpg', 'Lacoste L6048S 210', 0
from public.products p
where p.sku = '1209643200359'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895693660.jpg', 'Lacoste L6052S 001', 0
from public.products p
where p.sku = '1209643200360'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895603621.jpg', 'Lacoste L6007S 218', 0
from public.products p
where p.sku = '1209643200164'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895639934.jpg', 'Lacoste L6030S 301', 0
from public.products p
where p.sku = '1209643200180'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895639774.jpg', 'Lacoste L6023S 204', 0
from public.products p
where p.sku = '1209643200263'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895699693.jpg', 'Lacoste L2311 714', 0
from public.products p
where p.sku = '1209648800855'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895648387.jpg', 'Lacoste L2876 275', 0
from public.products p
where p.sku = '1209648800556'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895639798.jpg', 'Lacoste L6023S 264', 0
from public.products p
where p.sku = '1209643200039'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895636285.jpg', 'Lacoste L2297 275', 0
from public.products p
where p.sku = '1209648800202'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895633345.jpg', 'Lacoste L2298 002', 0
from public.products p
where p.sku = '1209648800204'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895646543.jpg', 'Lacoste L3804B 315', 0
from public.products p
where p.sku = '1209648800046'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895523028.jpg', 'Lacoste L2279 401', 0
from public.products p
where p.sku = '1209648800058'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//aerialvision/886895588805.jpg', 'Lacoste L2925 400', 0
from public.products p
where p.sku = '1209648800035'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895663021.jpg', 'Lacoste L266S 301', 0
from public.products p
where p.sku = '1209643200289'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895648646.jpg', 'Lacoste L916S 210', 0
from public.products p
where p.sku = '1209643200213'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895407465.jpg', 'Lacoste L3632 615', 0
from public.products p
where p.sku = '1209648800502'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895698177.jpg', 'Lacoste L2986 230', 0
from public.products p
where p.sku = '1209648800816'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895596152.jpg', 'Liu Jo LJ2168 722', 0
from public.products p
where p.sku = '1209648800893'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895596169.jpg', 'Liu Jo LJ2168 731', 0
from public.products p
where p.sku = '1209648800894'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895664455.jpg', 'Liu Jo LJ2175 722', 0
from public.products p
where p.sku = '1209648800896'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895689465.jpg', 'Liu Jo LJ2177 712', 0
from public.products p
where p.sku = '1209648800907'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895689472.jpg', 'Liu Jo LJ2177 714', 0
from public.products p
where p.sku = '1209648800908'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/8056255308769.jpg', 'Liu Jo LJ801S 001', 0
from public.products p
where p.sku = '1209643200373'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/8056255785843.jpg', 'Liu Jo LJ810S 001', 0
from public.products p
where p.sku = '1209643200380'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/8056255308653.jpg', 'Liu Jo LJ159S 716', 0
from public.products p
where p.sku = '1209643200304'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/8055130515216.jpg', 'Liu Jo LJ771S 033', 0
from public.products p
where p.sku = '1209643200179'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895616768.jpg', 'Liu Jo LJ2785 200', 0
from public.products p
where p.sku = '1209648800115'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895641869.jpg', 'Liu Jo LJ2803 610', 0
from public.products p
where p.sku = '1209648800133'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895519267.jpg', 'Liu Jo LJ2159 718', 0
from public.products p
where p.sku = '1209648800138'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895641449.jpg', 'Liu Jo LJ2172 722', 0
from public.products p
where p.sku = '1209648800150'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895698276.jpg', 'Longchamp LO778S 272', 0
from public.products p
where p.sku = '1209643200525'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895698283.jpg', 'Longchamp LO778S 300', 0
from public.products p
where p.sku = '1209643200526'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895776110.jpg', 'Longchamp LO808S 900', 0
from public.products p
where p.sku = '1209643200527'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895775687.jpg', 'Longchamp LO801S 601', 0
from public.products p
where p.sku = '1209643200483'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895668323.jpg', 'Longchamp LO750S 434', 0
from public.products p
where p.sku = '1209643200486'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895721899.jpg', 'Longchamp LO791S 614', 0
from public.products p
where p.sku = '1209643200488'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895715782.jpg', 'Longchamp LO187S 725', 0
from public.products p
where p.sku = '1209643200493'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895741521.jpg', 'Longchamp LO2608 N 690', 0
from public.products p
where p.sku = '1209648801086'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895667135.jpg', 'Longchamp LO2169 040', 0
from public.products p
where p.sku = '1209648801088'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895667142.jpg', 'Longchamp LO2169 714', 0
from public.products p
where p.sku = '1209648801090'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895716048.jpg', 'Longchamp LO2180 040', 0
from public.products p
where p.sku = '1209648801091'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895716055.jpg', 'Longchamp LO2180 714', 0
from public.products p
where p.sku = '1209648801092'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895716062.jpg', 'Longchamp LO2180 770', 0
from public.products p
where p.sku = '1209648801093'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895717786.jpg', 'Longchamp LO2183 254', 0
from public.products p
where p.sku = '1209648801094'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895717816.jpg', 'Longchamp LO2183 641', 0
from public.products p
where p.sku = '1209648801095'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895775458.jpg', 'Longchamp LO2184 230', 0
from public.products p
where p.sku = '1209648801097'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895775472.jpg', 'Longchamp LO2184 714', 0
from public.products p
where p.sku = '1209648801098'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895542074.jpg', 'Longchamp LO2691 690', 0
from public.products p
where p.sku = '1209648801099'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895644846.jpg', 'Longchamp LO2739 607', 0
from public.products p
where p.sku = '1209648801106'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895644839.jpg', 'Longchamp LO2739 228', 0
from public.products p
where p.sku = '1209648801107'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895692052.jpg', 'Longchamp LO2741 607', 0
from public.products p
where p.sku = '1209648801108'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895667746.jpg', 'Longchamp LO2756 427', 0
from public.products p
where p.sku = '1209648801109'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895775588.jpg', 'Longchamp LO2793 230', 0
from public.products p
where p.sku = '1209648801112'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895776097.jpg', 'Longchamp LO2798 610', 0
from public.products p
where p.sku = '1209648801118'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895779418.jpg', 'Longchamp LO2801 601', 0
from public.products p
where p.sku = '1209648801119'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895775656.jpg', 'Longchamp LO801S 001', 0
from public.products p
where p.sku = '1209643200481'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895716161.jpg', 'Longchamp LO795S 319', 0
from public.products p
where p.sku = '1209643200445'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//aerialvision/886895692212.jpg', 'Longchamp LO779S 008', 0
from public.products p
where p.sku = '1209643200408'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895692199.jpg', 'Longchamp LO2770 300', 0
from public.products p
where p.sku = '1209648800872'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895667845.jpg', 'Longchamp LO2752 408', 0
from public.products p
where p.sku = '1209648800876'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895685290.jpg', 'Longchamp LO2761 001', 0
from public.products p
where p.sku = '1209648800877'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895685405.jpg', 'Longchamp LO2761 316', 0
from public.products p
where p.sku = '1209648800878'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895754163.jpg', 'Longchamp LO2768 N 001', 0
from public.products p
where p.sku = '1209648800882'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895693608.jpg', 'Longchamp LO2768 601', 0
from public.products p
where p.sku = '1209648800884'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895685436.jpg', 'Longchamp LO2166 708', 0
from public.products p
where p.sku = '1209648800887'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895667548.jpg', 'Longchamp LO2753 011', 0
from public.products p
where p.sku = '1209648800551'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895667753.jpg', 'Longchamp LO2756 605', 0
from public.products p
where p.sku = '1209648800841'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895476584.jpg', 'Longchamp LO140SL 719', 0
from public.products p
where p.sku = '1209643200325'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895692144.jpg', 'Longchamp LO181S 708', 0
from public.products p
where p.sku = '1209643200333'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895667159.jpg', 'Longchamp LO2169 730', 0
from public.products p
where p.sku = '1209648800682'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895696746.jpg', 'Longchamp LO776S 001', 0
from public.products p
where p.sku = '1209643200343'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895692038.jpg', 'Longchamp LO2741 211', 0
from public.products p
where p.sku = '1209648800693'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895687805.jpg', 'Longchamp LO2765 001', 0
from public.products p
where p.sku = '1209648800615'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895667838.jpg', 'Longchamp LO2752 213', 0
from public.products p
where p.sku = '1209648800521'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895667173.jpg', 'Longchamp LO2166 045', 0
from public.products p
where p.sku = '1209648800524'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895551182.jpg', 'Longchamp LO2150 001', 0
from public.products p
where p.sku = '1209648800432'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895569132.jpg', 'Longchamp LO2705 302', 0
from public.products p
where p.sku = '1209648800467'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895685429.jpg', 'Longchamp LO2761 609', 0
from public.products p
where p.sku = '1209648800849'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895669009.jpg', 'Longchamp LO2733 500', 0
from public.products p
where p.sku = '1209648800022'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895666756.jpg', 'Longchamp LO764S 200', 0
from public.products p
where p.sku = '1209643200297'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895622608.jpg', 'Longchamp LO171S 728', 0
from public.products p
where p.sku = '1209643200214'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895692182.jpg', 'Longchamp LO2770 211', 0
from public.products p
where p.sku = '1209648800949'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895448406.jpg', 'Longchamp LO2128 512', 0
from public.products p
where p.sku = '1209648800334'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895704878.jpg', 'Nike NIKE 1000C 034', 0
from public.products p
where p.sku = '1209648801133'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895732055.jpg', 'Nike NIKE 1000C 416', 0
from public.products p
where p.sku = '1209648801134'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3166S 123932.jpg', 'Persol PO3166S 123932', 0
from public.products p
where p.sku = '1201043200178'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3166S 124051.jpg', 'Persol PO3166S 124051', 0
from public.products p
where p.sku = '1201043200179'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3286S 96-56.jpg', 'Persol PO3286S 96/56', 0
from public.products p
where p.sku = '1201043200176'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3092SM 95-4E.jpg', 'Persol PO3092SM 95/4E', 0
from public.products p
where p.sku = '1201043200166'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3292S 204-S3.jpg', 'Persol PO3292S 204/S3', 0
from public.products p
where p.sku = '1201043200167'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3381V 24.jpg', 'Persol PO3381V 24', 0
from public.products p
where p.sku = '1201043200169'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3383S 123653.jpg', 'Persol PO3383S 123653', 0
from public.products p
where p.sku = '1201043200170'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3210S 95-31.jpg', 'Persol PO3210S 95/31', 0
from public.products p
where p.sku = '1201043200067'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3345S 24-31.jpg', 'Persol PO3345S 24/31', 0
from public.products p
where p.sku = '1201048800049'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3345S 95-B1.jpg', 'Persol PO3345S 95/B1', 0
from public.products p
where p.sku = '1201048800060'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3007VM 24.jpg', 'Persol PO3007VM 24', 0
from public.products p
where p.sku = '1201048800061'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3379S 204-56.jpg', 'Persol PO3379S 204/56', 0
from public.products p
where p.sku = '1201043200159'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3143V 1160.jpg', 'Persol PO3143V 1160', 0
from public.products p
where p.sku = '1201048800065'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3378S 204-56.jpg', 'Persol PO3378S 204/56 Loris', 0
from public.products p
where p.sku = '1201043200142'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3007V 309.jpg', 'Persol PO3007V 309', 0
from public.products p
where p.sku = '1201048800057'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3375S 24-51.jpg', 'Persol PO3375S 24/51', 0
from public.products p
where p.sku = '1201043200148'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3171S 96-Q8.jpg', 'Persol PO3171S 96/Q8', 0
from public.products p
where p.sku = '1201043200092'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3152S 904356.jpg', 'Persol PO3152S 904356', 0
from public.products p
where p.sku = '1201043200100'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3166S 24-31.jpg', 'Persol PO3166S 24/31', 0
from public.products p
where p.sku = '1201043200101'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3318V 1188.jpg', 'Persol PO3318V 1188', 0
from public.products p
where p.sku = '1201043200127'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3318V 1142.jpg', 'Persol PO3318V 1142', 0
from public.products p
where p.sku = '1201043200129'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3318V 204.jpg', 'Persol PO3318V 204', 0
from public.products p
where p.sku = '1201043200130'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3353V 1203.jpg', 'Persol PO3353V 1203', 0
from public.products p
where p.sku = '1201043200133'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3353V 204.jpg', 'Persol PO3353V 204', 0
from public.products p
where p.sku = '1201043200134'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3378S 95-31.jpg', 'Persol PO3378S 95/31 Loris', 0
from public.products p
where p.sku = '1201043200137'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3378S 24-48.jpg', 'Persol PO3378S 24/48 Loris', 0
from public.products p
where p.sku = '1201043200138'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3318V 24.jpg', 'Persol PO3318V 24', 0
from public.products p
where p.sku = '1201048800055'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3166S 960-56.jpg', 'Persol PO3166S 960/56', 0
from public.products p
where p.sku = '1201043200094'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3171S 204-S3.jpg', 'Persol PO3171S 204/S3', 0
from public.products p
where p.sku = '1201043200095'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3292S 309-Q8.jpg', 'Persol PO3292S 309/Q8', 0
from public.products p
where p.sku = '1201043200096'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3007V 1142.jpg', 'Persol PO3007V 1142', 0
from public.products p
where p.sku = '1201048800045'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3007V 1192.jpg', 'Persol PO3007V 1192', 0
from public.products p
where p.sku = '1201048800046'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3007V 1192.jpg', 'Persol PO3007V 1192', 0
from public.products p
where p.sku = '1201048800047'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3092V 1219.jpg', 'Persol PO3092V 1219', 0
from public.products p
where p.sku = '1201048800050'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3092V 96.jpg', 'Persol PO3092V 96', 0
from public.products p
where p.sku = '1201048800051'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3143V 1051.jpg', 'Persol PO3143V 1051', 0
from public.products p
where p.sku = '1201048800052'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3210S 24-31.jpg', 'Persol PO3210S 24/31', 0
from public.products p
where p.sku = '1201043200080'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3007V 1142.jpg', 'Persol PO3007V 1142', 0
from public.products p
where p.sku = '1201048800031'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3007VM 1196.jpg', 'Persol PO3007VM 1196', 0
from public.products p
where p.sku = '1201048800033'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3007VM 24.jpg', 'Persol PO3007VM 24', 0
from public.products p
where p.sku = '1201048800034'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3007VM 95.jpg', 'Persol PO3007VM 95', 0
from public.products p
where p.sku = '1201048800035'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3092SM 901531.jpg', 'Persol PO3092SM 901531', 0
from public.products p
where p.sku = '1201043200083'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3092V 96.jpg', 'Persol PO3092V 96', 0
from public.products p
where p.sku = '1201048800036'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3143V 1141.jpg', 'Persol PO3143V 1141', 0
from public.products p
where p.sku = '1201048800037'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3143V 1142.jpg', 'Persol PO3143V 1142', 0
from public.products p
where p.sku = '1201048800038'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3143V 24.jpg', 'Persol PO3143V 24', 0
from public.products p
where p.sku = '1201048800039'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3292V 1208.jpg', 'Persol PO3292V 1208', 0
from public.products p
where p.sku = '1201048800040'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3337V 24.jpg', 'Persol PO3337V 24', 0
from public.products p
where p.sku = '1201048800044'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3345S 96-56.jpg', 'Persol PO3345S 96/56', 0
from public.products p
where p.sku = '1201043200088'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3292S 1226B1.jpg', 'Persol PO3292S 1226B1', 0
from public.products p
where p.sku = '1201043200090'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3171S 1103B1.jpg', 'Persol PO3171S 1103B1', 0
from public.products p
where p.sku = '1201043200098'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3007V 1208.jpg', 'Persol PO3007V 1208', 0
from public.products p
where p.sku = '1201048800032'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3286S 116931.jpg', 'Persol PO3286S 116931', 0
from public.products p
where p.sku = '1201043200085'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0PO3292S 96-56.jpg', 'Persol PO3292S 96/56', 0
from public.products p
where p.sku = '1201043200087'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB4401D 601-72.jpg', 'Ray-Ban RB4401D 601/72', 0
from public.products p
where p.sku = '1201043200103'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB2140 902-51.jpg', 'Ray-Ban RB2140 902/51 Wayfarer', 0
from public.products p
where p.sku = '1201043200108'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB4441D 667787.jpg', 'Ray-Ban RB4441D 667787', 0
from public.products p
where p.sku = '1201043200124'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB4441D 678793.jpg', 'Ray-Ban RB4441D 678793', 0
from public.products p
where p.sku = '1201043200126'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB3548 001-3F.jpg', 'Ray-Ban RB3548 001/3F Hexagonal', 0
from public.products p
where p.sku = '1201043200078'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB3025 001-33.jpg', 'Ray-Ban RB3025 001/33 Aviator Large Metal', 0
from public.products p
where p.sku = '1201043200082'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB2140 129431.jpg', 'Ray-Ban RB2140 129431 Wayfarer', 0
from public.products p
where p.sku = '1201043200001'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB2140 901-32.jpg', 'Ray-Ban RB2140 901/32 Wayfarer', 0
from public.products p
where p.sku = '1201043200003'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB2241 13323F.jpg', 'Ray-Ban RB2241 13323F Wayfarer Way', 0
from public.products p
where p.sku = '1201043200014'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB3016 901-58.jpg', 'Ray-Ban RB3016 901/58 Clubmaster', 0
from public.products p
where p.sku = '1201043200017'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB3447 001-3M.jpg', 'Ray-Ban RB3447 001/3M Round Metal', 0
from public.products p
where p.sku = '1201043200019'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB3447 112-58.jpg', 'Ray-Ban RB3447 112/58 Round Metal', 0
from public.products p
where p.sku = '1201043200020'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB3447 001-3M.jpg', 'Ray-Ban RB3447 001/3M Round Metal', 0
from public.products p
where p.sku = '1201043200021'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB3548 001-3F.jpg', 'Ray-Ban RB3548 001/3F Hexagonal', 0
from public.products p
where p.sku = '1201043200024'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB3548 001-3F.jpg', 'Ray-Ban RB3548 001/3F Hexagonal', 0
from public.products p
where p.sku = '1201043200026'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB3749 002-71.jpg', 'Ray-Ban RB3749 002/71', 0
from public.products p
where p.sku = '1201043200032'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB3749 001-31.jpg', 'Ray-Ban RB3749 001/31', 0
from public.products p
where p.sku = '1201043200033'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB4105 601-58.jpg', 'Ray-Ban RB4105 601/58 Folding Wayfarer', 0
from public.products p
where p.sku = '1201043200036'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB4451 601-B1.jpg', 'Ray-Ban RB4451 601/B1', 0
from public.products p
where p.sku = '1201043200043'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RBR0103S 001-79.jpg', 'Ray-Ban RBR0103S 001/79 Round Reverse', 0
from public.products p
where p.sku = '1201043200048'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RX4379VD 8445.jpg', 'Ray-Ban RX4379VD 8445', 0
from public.products p
where p.sku = '1201048800006'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RX5425D 2000.jpg', 'Ray-Ban RX5425D 2000', 0
from public.products p
where p.sku = '1201048800010'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RX7259D 8437.jpg', 'Ray-Ban RX7259D 8437', 0
from public.products p
where p.sku = '1201048800016'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB2176 136885.jpg', 'Ray-Ban RB2176 136885 Clubmaster Folding', 0
from public.products p
where p.sku = '1201043200052'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB2195 902-31.jpg', 'Ray-Ban RB2195 902/31 Thalia', 0
from public.products p
where p.sku = '1201043200053'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB2242 901-31.jpg', 'Ray-Ban RB2242 901/31 Wayfarer Oval', 0
from public.products p
where p.sku = '1201043200059'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB2242 902-GI.jpg', 'Ray-Ban RB2242 902/GI Wayfarer Oval', 0
from public.products p
where p.sku = '1201043200060'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RX6533 2500.jpg', 'Ray-Ban RX6533 2500', 0
from public.products p
where p.sku = '1201048800024'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RX7159 2000.jpg', 'Ray-Ban RX7159 2000', 0
from public.products p
where p.sku = '1201048800025'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB2241 954-58.jpg', 'Ray-Ban RB2241 954/58 Wayfarer Way', 0
from public.products p
where p.sku = '1201043200111'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RB3565 001-51.jpg', 'Ray-Ban RB3565 001/51 Jack', 0
from public.products p
where p.sku = '1201043200028'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//luxottica/0RX5417 2034.jpg', 'Ray-Ban RX5417 2034', 0
from public.products p
where p.sku = '1201248800004'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895654371.jpg', 'Victoria Beckham VB246S 001', 0
from public.products p
where p.sku = '1209643200352'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895688154.jpg', 'Victoria Beckham VB2676 001', 0
from public.products p
where p.sku = '1209648800747'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895688185.jpg', 'Victoria Beckham VB2676 316', 0
from public.products p
where p.sku = '1209648800749'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895685597.jpg', 'Victoria Beckham VB2680 001', 0
from public.products p
where p.sku = '1209648800751'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895619738.jpg', 'Victoria Beckham VB668S 215', 0
from public.products p
where p.sku = '1209643200356'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895670425.jpg', 'Victoria Beckham VB684S 001', 0
from public.products p
where p.sku = '1209643200357'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895605038.jpg', 'Victoria Beckham VB2656 001', 0
from public.products p
where p.sku = '1209648800562'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895560702.jpg', 'Victoria Beckham VB646S 001', 0
from public.products p
where p.sku = '1209643200281'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895605052.jpg', 'Victoria Beckham VB2656 215', 0
from public.products p
where p.sku = '1209648800483'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//aerialvision/886895622196.jpg', 'Victoria Beckham VB2659 038', 0
from public.products p
where p.sku = '1209648800745'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895654364.jpg', 'Victoria Beckham VB2135 770', 0
from public.products p
where p.sku = '1209648800486'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895625258.jpg', 'Zeiss ZS23138LPMAG-SET 203', 0
from public.products p
where p.sku = '1209648801022'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895622103.jpg', 'Zeiss ZS23537 036', 0
from public.products p
where p.sku = '1209648800776'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895622110.jpg', 'Zeiss ZS23537 216', 0
from public.products p
where p.sku = '1209648800777'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895663854.jpg', 'Zeiss ZS24153 002', 0
from public.products p
where p.sku = '1209648800752'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895683838.jpg', 'Zeiss ZS25162LPMAG-SET 326', 0
from public.products p
where p.sku = '1209648800754'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895667487.jpg', 'Zeiss ZS24721SLP 239', 0
from public.products p
where p.sku = '1209643200266'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895644006.jpg', 'Zeiss ZS24543S 237', 0
from public.products p
where p.sku = '1209643200270'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895643993.jpg', 'Zeiss ZS24543S 001', 0
from public.products p
where p.sku = '1209643200271'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895664189.jpg', 'Zeiss ZS24549 200', 0
from public.products p
where p.sku = '1209648800471'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895625241.jpg', 'Zeiss ZS23138LPMAG-SET 002', 0
from public.products p
where p.sku = '1209648800472'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895599467.jpg', 'Zeiss ZS23128 202', 0
from public.products p
where p.sku = '1209648800474'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895599450.jpg', 'Zeiss ZS23128 003', 0
from public.products p
where p.sku = '1209648800475'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

insert into public.product_images (product_id, image_url, alt_text, position)
select p.id, 'https://d237xocrarx9cy.cloudfront.net/image/foto//marchon/886895643955.jpg', 'Zeiss ZS24542 001', 0
from public.products p
where p.sku = '1209648800552'
on conflict (product_id, position) do update set
  image_url = excluded.image_url,
  alt_text = excluded.alt_text;

commit;
