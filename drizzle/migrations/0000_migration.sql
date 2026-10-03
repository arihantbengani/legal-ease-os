create table public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  name text not null,
  company text not null default '',
  email text not null default '',
  phone text not null default '',
  created_at timestamptz not null default now()
);
create table public.cases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  title text not null,
  client text not null default '',
  case_type text not null default '',
  status text not null default 'Active',
  court text not null default '',
  next_hearing date,
  value numeric not null default 0,
  created_at timestamptz not null default now()
);
create table public.hearings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  case_title text not null,
  hearing_date date not null,
  hearing_time text not null default '',
  court text not null default '',
  judge text not null default '',
  purpose text not null default '',
  created_at timestamptz not null default now()
);
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  name text not null,
  case_title text not null default '',
  kind text not null default 'Draft',
  created_at timestamptz not null default now()
);
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  invoice_no text not null default '',
  client text not null,
  amount numeric not null default 0,
  issued date not null default current_date,
  due date,
  status text not null default 'Outstanding',
  created_at timestamptz not null default now()
);
do $$
declare t text;
begin
  foreach t in array array['clients','cases','hearings','documents','invoices'] loop
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "Own rows select" on public.%I for select to authenticated using (auth.uid() = user_id)', t);
    execute format('create policy "Own rows insert" on public.%I for insert to authenticated with check (auth.uid() = user_id)', t);
    execute format('create policy "Own rows update" on public.%I for update to authenticated using (auth.uid() = user_id)', t);
    execute format('create policy "Own rows delete" on public.%I for delete to authenticated using (auth.uid() = user_id)', t);
  end loop;
end $$;