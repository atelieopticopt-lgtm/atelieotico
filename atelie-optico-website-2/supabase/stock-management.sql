-- Run once in Supabase SQL Editor to enable the complete stock dashboard.
begin;

alter table public.products
  add column if not exists description text,
  add column if not exists category text,
  add column if not exists stock_quantity integer not null default 0,
  add column if not exists low_stock_threshold integer not null default 5,
  add column if not exists cost_price numeric(12,2),
  add column if not exists is_active boolean not null default true;

alter table public.products
  drop constraint if exists products_stock_quantity_check,
  add constraint products_stock_quantity_check check (stock_quantity >= 0),
  drop constraint if exists products_low_stock_threshold_check,
  add constraint products_low_stock_threshold_check check (low_stock_threshold >= 0),
  drop constraint if exists products_cost_price_check,
  add constraint products_cost_price_check check (cost_price is null or cost_price >= 0);

create index if not exists products_stock_quantity_idx on public.products(stock_quantity);
create index if not exists products_category_idx on public.products(category);
create index if not exists products_is_active_idx on public.products(is_active);

commit;

select column_name, data_type
from information_schema.columns
where table_schema = 'public' and table_name = 'products'
order by ordinal_position;
