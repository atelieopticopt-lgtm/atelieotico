create table if not exists public.discounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  discount_type text not null check (discount_type in ('percentage','fixed')),
  value numeric(12,2) not null check (value >= 0),
  description text,
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at > starts_at),
  check (discount_type <> 'percentage' or value <= 100)
);

create table if not exists public.page_content (
  id uuid primary key default gen_random_uuid(),
  page_path text not null,
  section_key text not null,
  selector text not null,
  property text not null check (property in ('text','html','src','href')),
  value text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(page_path, section_key)
);

alter table public.discounts enable row level security;
alter table public.page_content enable row level security;

create policy "Active discounts are public" on public.discounts for select using (is_active or public.is_admin());
create policy "Admins insert discounts" on public.discounts for insert with check (public.is_admin());
create policy "Admins update discounts" on public.discounts for update using (public.is_admin()) with check (public.is_admin());
create policy "Admins delete discounts" on public.discounts for delete using (public.is_admin());
create policy "Active page content is public" on public.page_content for select using (is_active or public.is_admin());
create policy "Admins insert page content" on public.page_content for insert with check (public.is_admin());
create policy "Admins update page content" on public.page_content for update using (public.is_admin()) with check (public.is_admin());
create policy "Admins delete page content" on public.page_content for delete using (public.is_admin());

grant select on public.discounts, public.page_content to anon, authenticated;
grant insert, update, delete on public.discounts, public.page_content to authenticated;

create trigger discounts_set_updated_at before update on public.discounts for each row execute procedure public.set_updated_at();
create trigger page_content_set_updated_at before update on public.page_content for each row execute procedure public.set_updated_at();

