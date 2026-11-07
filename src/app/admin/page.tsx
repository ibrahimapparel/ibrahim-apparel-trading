"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { PRODUCTS, fmt } from "@/lib/products";

type Tab = "overview" | "products" | "orders" | "customers" | "settings" | "reports";

export default function AdminPage() {
  const { user, isAdmin, loading, configured, signIn, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [products, setProducts] = useState(PRODUCTS);
  const [msg, setMsg] = useState("");

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-16">Loading…</div>;
  if (!configured) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl font-bold">Admin</h1>
        <div className="clay p-5 mt-5 text-sm">
          <p className="font-semibold">Admin is not connected yet.</p>
          <p className="mt-2">Set the Supabase env vars in Vercel, run supabase/schema.sql, then set your account as admin with the SQL in README.md (<code>update profiles set is_admin = true where email = …</code>). Then log in here with that email — only admins can open this dashboard, and every admin API route checks the session server-side.</p>
        </div>
      </div>
    );
  }
  if (!user || !isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl font-bold">Admin Login</h1>
        <p className="text-sm text-[#777777] mt-2">Admin access only. This page is not linked from the public website.</p>
        <div className="clay p-5 mt-5 space-y-3">
          <input placeholder="Admin email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-xl px-4 py-3" />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-xl px-4 py-3" />
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button onClick={async () => { const r = await signIn(email, password); if (r.error) setErr(r.error); else setErr("Logged in — if you are not an admin, this dashboard will stay locked. Set is_admin=true for this email in Supabase (see README)."); }} className="w-full bg-[#172b3a] text-white rounded-full py-3">Log In as Admin</button>
        </div>
      </div>
    );
  }
  const tabs: [Tab, string][] = [["overview", "Overview"], ["products", "Products"], ["orders", "Orders"], ["customers", "Customers"], ["settings", "Website & Settings"], ["reports", "Reports"]];
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={signOut} className="border px-4 py-2 rounded-full text-sm">Log Out ({user.email})</button>
      </div>
      <div className="flex gap-2 flex-wrap mt-5">
        {tabs.map(([t, label]) => <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full border text-sm ${tab === t ? "bg-[#172b3a] text-white" : ""}`}>{label}</button>)}
      </div>
      {tab === "overview" && (
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="clay p-5"><p className="text-sm text-[#777777]">Products</p><p className="text-3xl font-bold">{products.length}</p></div>
          <div className="clay p-5"><p className="text-sm text-[#777777]">Orders</p><p className="text-3xl font-bold">0</p><p className="text-xs text-[#777777]">Live orders appear here once Supabase is connected.</p></div>
          <div className="clay p-5"><p className="text-sm text-[#777777]">Free shipping threshold</p><p className="text-3xl font-bold">Rs 5,000</p></div>
        </div>
      )}
      {tab === "products" && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-[#777777]">Demo catalogue shown below. With Supabase connected, edits here save to the database via /api/products (admin-only) and go live for all visitors. Without Supabase, edits in this demo are local only.</p>
          {msg && <p className="text-green-700 text-sm">{msg}</p>}
          {products.map((p) => (
            <div key={p.id} className="clay p-4 flex flex-wrap gap-3 items-center">
              <span className="font-semibold flex-1 min-w-[200px]">{p.name}</span>
              <span className="text-sm">{p.category}</span>
              <input type="number" defaultValue={p.price} onBlur={(e) => { const v = Number(e.target.value); if (v > 0) { setProducts((ps) => ps.map((x) => x.id === p.id ? { ...x, price: v } : x)); setMsg(`Price updated locally for ${p.name} — ${fmt(v)}`); } }} className="border rounded-lg px-3 py-2 w-28" aria-label={`Price for ${p.name}`} />
              <button onClick={() => { setProducts((ps) => ps.filter((x) => x.id !== p.id)); setMsg(`${p.name} removed locally.`); }} className="text-sm underline text-red-600">Delete</button>
            </div>
          ))}
        </div>
      )}
      {tab === "orders" && <div className="clay p-5 mt-6 text-sm"><p>Order statuses: Order Received → Confirmed → Processing → Dispatched → Out for Delivery → Delivered, or Cancelled.</p><p className="text-[#777777] mt-2">No orders yet. Orders placed on the live site (Supabase connected) will list here with status controls.</p></div>}
      {tab === "customers" && <div className="clay p-5 mt-6 text-sm">Customers who create accounts in Supabase Auth appear here (profiles table). No customers yet in this demo.</div>}
      {tab === "settings" && (
        <div className="clay p-5 mt-6 space-y-3 text-sm">
          <p><strong>Announcement:</strong> Premium Winter Collection Now Available · Nationwide Delivery Across Pakistan · Free shipping on orders over Rs 5,000</p>
          <p><strong>Free shipping over:</strong> Rs 5,000 · <strong>Shipping fee:</strong> Rs 300</p>
          <p><strong>WhatsApp:</strong> +92 327 5084710</p>
          <p className="text-[#777777]">With Supabase connected, these settings are stored in the settings table and editable here.</p>
        </div>
      )}
      {tab === "reports" && <div className="clay p-5 mt-6 text-sm">Sales reports are generated from the orders table in Supabase. No sales data yet in this demo.</div>}
    </div>
  );
}
