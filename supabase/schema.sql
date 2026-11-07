-- Ibrahim Apparel & Trading — Supabase schema
-- Run this in Supabase: SQL Editor → New query → paste → Run.
-- Requires Supabase Auth (email provider) enabled: Authentication → Providers → Email.

create extension if not exists "pgcrypto";

-- Profiles: one row per auth user. is_admin is set manually (see README).
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  default_address text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row when a user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name, phone)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone')
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

create table if not exists public.products (
  id text primary key,
  name text not null,
  price integer not null check (price >= 0),
  old_price integer,
  category text not null,
  collection text not null,
  gender text not null default 'men' check (gender in ('men','ladies','unisex')),
  image text not null,
  colors text[] not null default '{}',
  sizes text[] not null default '{}',
  description text not null default '',
  is_new boolean not null default false,
  on_sale boolean not null default false,
  stock integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  province text,
  city text,
  address text not null,
  payment_method text not null default 'COD',
  subtotal integer not null,
  shipping integer not null default 0,
  total integer not null,
  status text not null default 'Order Received'
    check (status in ('Order Received','Confirmed','Processing','Dispatched','Out for Delivery','Delivered','Cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text,
  product_name text not null,
  size text,
  color text,
  qty integer not null default 1,
  price integer not null
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id text references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  author_name text,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.settings (
  id integer primary key default 1,
  announcement text not null default 'Premium Winter Collection Now Available · Nationwide Delivery Across Pakistan · Free shipping on orders over Rs 5,000',
  free_shipping_threshold integer not null default 5000,
  shipping_fee integer not null default 300,
  whatsapp_number text not null default '+923275084710',
  updated_at timestamptz not null default now()
);
insert into public.settings (id) values (1) on conflict (id) do nothing;

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews enable row level security;
alter table public.subscribers enable row level security;
alter table public.settings enable row level security;

-- Public read: products + settings + approved reviews. Nobody writes via anon key.
create policy "public read products" on public.products for select using (active = true);
create policy "public read settings" on public.settings for select using (true);
create policy "public read approved reviews" on public.reviews for select using (approved = true);

-- Customers: read/update their own profile; read their own orders.
create policy "own profile" on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);
create policy "own orders" on public.orders for select using (auth.uid() = user_id);
create policy "own order items" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_items.order_id and o.user_id = auth.uid())
);
create policy "own review insert" on public.reviews for insert with check (auth.uid() = user_id);

-- Admin: full access when profiles.is_admin is true. (Service-role key bypasses RLS for server routes.)
create policy "admin all products" on public.products for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
);
create policy "admin all orders" on public.orders for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
);
create policy "admin all order items" on public.order_items for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
);
create policy "admin all reviews" on public.reviews for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
);
create policy "admin all profiles" on public.profiles for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
);
create policy "admin all subscribers" on public.subscribers for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
);
create policy "admin all settings" on public.settings for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
);

-- Storage bucket for product photos (create in Dashboard → Storage if you upload your own photos).
-- insert into storage.buckets (id, name, public) values ('product-photos', 'product-photos', true)
--   on conflict (id) do nothing;
