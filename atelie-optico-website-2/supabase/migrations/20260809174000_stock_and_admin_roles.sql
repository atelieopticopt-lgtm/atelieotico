alter table public.products
  add column if not exists description text,
  add column if not exists category text,
  add column if not exists stock_quantity integer not null default 0,
  add column if not exists low_stock_threshold integer not null default 5,
  add column if not exists cost_price numeric(12,2),
  add column if not exists is_active boolean not null default true;

alter table public.products drop constraint if exists products_stock_quantity_check;
alter table public.products add constraint products_stock_quantity_check check (stock_quantity >= 0);
alter table public.products drop constraint if exists products_low_stock_threshold_check;
alter table public.products add constraint products_low_stock_threshold_check check (low_stock_threshold >= 0);
alter table public.products drop constraint if exists products_cost_price_check;
alter table public.products add constraint products_cost_price_check check (cost_price is null or cost_price >= 0);
create index if not exists products_stock_quantity_idx on public.products(stock_quantity);
create index if not exists products_category_idx on public.products(category);
create index if not exists products_is_active_idx on public.products(is_active);

alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists full_name text;
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists role text not null default 'admin';
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('admin', 'super_admin'));
create unique index if not exists profiles_username_unique on public.profiles (lower(username)) where username is not null;

update public.profiles
set role = 'super_admin', email = coalesce(email, 'admin@atelieotico.pt')
where id = (select id from auth.users where lower(email) = 'admin@atelieotico.pt' limit 1);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, is_admin, username, full_name, email, role)
  values (new.id, false, nullif(new.raw_user_meta_data ->> 'username', ''), nullif(new.raw_user_meta_data ->> 'full_name', ''), new.email, 'admin')
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

create or replace function public.is_super_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles where id = auth.uid() and is_admin = true and role = 'super_admin');
$$;

drop policy if exists "Users read own profile" on public.profiles;
drop policy if exists "Admins read permitted profiles" on public.profiles;
create policy "Admins read permitted profiles" on public.profiles
  for select using (id = auth.uid() or public.is_super_admin());
grant execute on function public.is_super_admin() to authenticated;
grant select on public.profiles to authenticated;
