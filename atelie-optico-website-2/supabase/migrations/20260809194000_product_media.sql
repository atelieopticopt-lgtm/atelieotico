alter table public.products add column if not exists display_order integer not null default 0;

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null check (image_url ~ '^https?://|^/'),
  alt_text text,
  source_url text,
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(product_id, image_url)
);

create index if not exists product_images_product_position_idx on public.product_images(product_id, position);
alter table public.product_images enable row level security;

drop policy if exists "Public can read product images" on public.product_images;
create policy "Public can read product images" on public.product_images for select using (true);
drop policy if exists "Admins manage product images" on public.product_images;
create policy "Admins manage product images" on public.product_images for all to authenticated
using (public.is_admin()) with check (public.is_admin());

do $$ begin
  alter publication supabase_realtime add table public.product_images;
exception when duplicate_object then null;
end $$;
