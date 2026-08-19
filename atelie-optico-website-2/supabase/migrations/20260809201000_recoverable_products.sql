alter table public.products
  add column if not exists deleted_at timestamptz;

create index if not exists products_deleted_at_idx
  on public.products (deleted_at);

comment on column public.products.deleted_at is
  'Soft-deletion timestamp. Null means the product is available to catalogue management.';
