create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_type text not null,
  page_path text not null,
  name text,
  email text,
  phone text,
  preferred_date date,
  message text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at timestamptz not null default now()
);
alter table public.form_submissions enable row level security;
create policy "Admins read submissions" on public.form_submissions for select using (public.is_admin());
create policy "Admins update submissions" on public.form_submissions for update using (public.is_admin()) with check (public.is_admin());
create policy "Admins delete submissions" on public.form_submissions for delete using (public.is_admin());
grant select, update, delete on public.form_submissions to authenticated;

