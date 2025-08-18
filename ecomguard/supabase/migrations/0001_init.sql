-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Core tables
create table if not exists stores (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamptz default now()
);

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  store_id uuid references stores(id) on delete cascade,
  role text default 'member',
  created_at timestamptz default now()
);

create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references stores(id) on delete cascade,
  email text,
  first_name text,
  last_name text,
  created_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references stores(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  name text not null,
  payload jsonb not null default '{}',
  ts timestamptz default now()
);

create table if not exists carts (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references stores(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  value_cents integer default 0,
  status text default 'open',
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references stores(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  total_cents integer default 0,
  status text default 'created',
  created_at timestamptz default now()
);

create table if not exists risk_scores (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references stores(id) on delete cascade,
  order_id uuid references orders(id) on delete cascade,
  type text not null,
  score numeric not null,
  threshold numeric not null,
  reason text,
  created_at timestamptz default now()
);

create table if not exists interventions (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references stores(id) on delete cascade,
  trigger text not null,
  conditions jsonb not null default '{}',
  channel text not null,
  template_id uuid,
  ab_bucket text,
  goal text,
  outcome jsonb,
  created_at timestamptz default now()
);

create table if not exists message_templates (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references stores(id) on delete cascade,
  name text not null,
  subject text,
  body text,
  created_at timestamptz default now()
);

create table if not exists experiments (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references stores(id) on delete cascade,
  name text not null,
  variant_a jsonb,
  variant_b jsonb,
  created_at timestamptz default now()
);

create table if not exists billing_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references stores(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text,
  created_at timestamptz default now()
);

create table if not exists integrations (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references stores(id) on delete cascade,
  type text not null,
  data jsonb not null default '{}',
  created_at timestamptz default now()
);

-- RLS
alter table stores enable row level security;
alter table users enable row level security;
alter table customers enable row level security;
alter table events enable row level security;
alter table carts enable row level security;
alter table orders enable row level security;
alter table risk_scores enable row level security;
alter table interventions enable row level security;
alter table message_templates enable row level security;
alter table experiments enable row level security;
alter table billing_subscriptions enable row level security;
alter table integrations enable row level security;

create policy "users can manage own store records" on stores using (
  exists(select 1 from users u where u.id = auth.uid() and u.store_id = stores.id)
);

create policy "users table: self" on users using (id = auth.uid());

create policy "store scoped access" on customers using (
  exists(select 1 from users u where u.id = auth.uid() and u.store_id = customers.store_id)
);

create policy "store scoped access" on events using (
  exists(select 1 from users u where u.id = auth.uid() and u.store_id = events.store_id)
);

create policy "store scoped access" on carts using (
  exists(select 1 from users u where u.id = auth.uid() and u.store_id = carts.store_id)
);

create policy "store scoped access" on orders using (
  exists(select 1 from users u where u.id = auth.uid() and u.store_id = orders.store_id)
);

create policy "store scoped access" on risk_scores using (
  exists(select 1 from users u where u.id = auth.uid() and u.store_id = risk_scores.store_id)
);

create policy "store scoped access" on interventions using (
  exists(select 1 from users u where u.id = auth.uid() and u.store_id = interventions.store_id)
);

create policy "store scoped access" on message_templates using (
  exists(select 1 from users u where u.id = auth.uid() and u.store_id = message_templates.store_id)
);

create policy "store scoped access" on experiments using (
  exists(select 1 from users u where u.id = auth.uid() and u.store_id = experiments.store_id)
);

create policy "store scoped access" on billing_subscriptions using (
  exists(select 1 from users u where u.id = auth.uid() and u.store_id = billing_subscriptions.store_id)
);

create policy "store scoped access" on integrations using (
  exists(select 1 from users u where u.id = auth.uid() and u.store_id = integrations.store_id)
);

