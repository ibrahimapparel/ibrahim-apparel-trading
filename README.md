# Ibrahim Apparel & Trading (Private) Limited — Vercel Store

Standalone Next.js 16 (App Router, TypeScript, Tailwind v4) e-commerce store, rebuilt for deployment on Vercel with Supabase as the database + auth. This is a rebuild of the Muse full-stack store — same brand, design and behaviour — as deployable code. The Muse artifacts are untouched.

Brand: **IBRAHIM APPAREL & TRADING (PRIVATE) LIMITED** — “Comfort Meets Class.”
Palette: Midnight Navy `#172B3A`, Ivory `#FAF8F4`, Warm Beige `#E9DFD0`, Mocha `#92765C`, Taupe `#B5A58E`, gold `#AA7F30`. Light default, light/dark toggle saved in browser.

## What is in here

- Homepage with Editorial / Magazine hero on desktop/tablet (768px+, gold “NEW WINTER COLLECTION 2026”, huge serif “WINTER, REDEFINED.”, flat-lay photo, floating product cards for Midnight Puffer Jacket Rs 8,999 and Emerald Embroidered Shawl Rs 2,999) and the previous simple hero on phones below 768px.
- Announcement ticker: 60s loop, pauses on hover, hidden on phones below 768px.
- Navigation: Winters, Shirts, Pants, Korean Trousers, Casual Wear, Ladies, New Arrivals, Sale — with mega-menus, search, account, wishlist, cart. WhatsApp floating button (+92 327 5084710). **No Admin link on the public site** — Admin only at `/admin`.
- Collections with category filters + sorting, product pages with mandatory size/colour (XS–XXL), cart, Pakistani checkout (provinces/cities, +92 mobile validation, COD / Bank Transfer, free shipping over Rs 5,000, order numbers `IF-YYYY-####`), order tracking by order number + phone, customer accounts, wishlist.
- Admin Dashboard at `/admin`: Overview, Products, Orders (Order Received → Confirmed → Processing → Dispatched → Out for Delivery → Delivered / Cancelled), Customers, Website & Settings, Reports.
- Seed catalogue: 25 starter products in PKR (14 men + 11 ladies), each with its own photo. No fabricated testimonials — reviews only from real customers.
- Supabase Auth: customers sign up with email verification, log in, reset password by email. Passwords are handled by Supabase Auth only — never stored in plain text, never stored by this app.
- API routes: `GET /api/products`, `POST /api/products` (admin only), `POST /api/orders`, `GET /api/orders?orderNumber&phone`, `POST /api/newsletter`.

## 1. Create a free Supabase project

1. Go to https://supabase.com → New project (free tier is fine).
2. In the project: **Authentication → Providers → Email** — make sure Email is enabled and “Confirm email” is on.
3. **Authentication → URL Configuration → Site URL**: set to your Vercel URL once deployed (e.g. `https://ibrahim-apparel-trading.vercel.app`), and add `http://localhost:3000` for local testing.
4. **SQL Editor → New query**: paste `supabase/schema.sql` and Run. Then paste `supabase/seed.sql` and Run. That creates `products, orders, order_items, profiles, reviews, subscribers, settings` with RLS policies.

## 2. Set up the first admin

1. Sign up on the live site (`/account`) with the email that should be admin, and verify it by email.
2. In Supabase SQL Editor, run:
   ```sql
   update public.profiles set is_admin = true where email = 'you@example.com';
   ```
3. Log in at `/admin` with that email. Only accounts with `is_admin = true` can open Admin, and every admin API route checks the session server-side.

## 3. Run locally

```bash
cp .env.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
npm install
npm run dev     # http://localhost:3000
npm run build   # must pass with no errors before deploying
```

Without Supabase keys the site still builds and runs in **demo mode**: the 25 seed products show, cart/checkout work in the browser, and the Account/Admin pages explain that Supabase is not connected. Orders are only stored centrally once Supabase is connected.

## 4. Deploy on Vercel

1. Push this folder to a GitHub repo (or import it in Vercel).
2. In Vercel: **Add New → Project → import the repo**. Framework: Next.js (auto-detected).
3. **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only — never put this in `NEXT_PUBLIC_*`)
   - `NEXT_PUBLIC_SITE_URL` = your Vercel URL
4. Deploy. Vercel gives you a `*.vercel.app` URL.
5. Add a custom domain in Vercel → Domains, then update the Supabase Site URL (step 1.3) to that domain.

## 5. Updating products

Go to `/admin` → Products. Edit price/stock, add or delete products. With Supabase connected, changes save to the database and go live for all visitors immediately. Product photos: paste an image URL, or upload to Supabase Storage (`product-photos` bucket, public) and use its URL.

## File structure

```
src/app/            pages: home, collection/[slug], product/[id], cart, checkout (+ success),
                    track, search, wishlist, account (+ reset-password), admin
src/app/api/        products, orders, newsletter
src/components/     Header (nav + mega-menus + ticker + WhatsApp), Footer, ProductCard
src/lib/            products.ts (25-product seed catalogue + nav + Pakistan data),
                    store.tsx (cart/wishlist), auth.tsx (Supabase Auth),
                    supabase/client.ts + server.ts
supabase/           schema.sql (tables + RLS), seed.sql (25 products)
public/favicon.svg  IA monogram
vercel.json  .env.example  .gitignore
```

## Gaps / known limits

- Product photos are Unsplash URLs for matching garments (modest, fully clothed). Replace them with your own product photos in Admin / Supabase Storage for a real launch.
- Email sending (verification / password reset) uses Supabase's built-in email. For branded emails at volume, add your own SMTP in Supabase → Auth → SMTP.
- No payment gateway is wired — checkout is COD / Bank Transfer only, as briefed. Add JazzCash/Easypaisa/Stripe later if wanted.
- Reviews: the table and RLS exist, but there is no public review-submission form yet — add one when real customers exist, so no testimonials are fabricated.
