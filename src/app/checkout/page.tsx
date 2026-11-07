"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { fmt, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, PAKISTAN_PROVINCES, isValidPkMobile, orderNumber } from "@/lib/products";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "", province: "Punjab", city: "Lahore", address: "", payment: "COD", notes: "" });
  const [err, setErr] = useState("");
  const [placing, setPlacing] = useState(false);
  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0 ? 0 : SHIPPING_FEE;
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const place = async () => {
    if (cart.length === 0) { setErr("Your cart is empty."); return; }
    if (!form.name || !form.address) { setErr("Please fill your name and full address."); return; }
    if (!isValidPkMobile(form.phone)) { setErr("Please enter a valid Pakistani mobile, e.g. 0327 5084710 or +92 327 5084710."); return; }
    setErr(""); setPlacing(true);
    const num = orderNumber();
    try {
      await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderNumber: num, customer: form, items: cart, subtotal: cartTotal, shipping, total: cartTotal + shipping }) });
    } catch {}
    try { localStorage.setItem("iat-last-order", JSON.stringify({ orderNumber: num, phone: form.phone, total: cartTotal + shipping })); } catch {}
    clearCart();
    router.push(`/checkout/success?order=${num}`);
  };
  if (cart.length === 0) return <div className="max-w-3xl mx-auto px-4 py-16"><h1 className="font-serif text-3xl font-bold">Checkout</h1><p className="mt-4">Your cart is empty.</p></div>;
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="font-serif text-3xl font-bold">Checkout</h1>
        <div className="clay p-5 mt-5 space-y-3">
          <input placeholder="Full name *" value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full border rounded-xl px-4 py-3" />
          <input placeholder="Mobile — 03XX XXXXXXX *" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full border rounded-xl px-4 py-3" />
          <input placeholder="Email (optional)" value={form.email} onChange={(e) => set("email", e.target.value)} className="w-full border rounded-xl px-4 py-3" />
          <select value={form.province} onChange={(e) => { set("province", e.target.value); set("city", PAKISTAN_PROVINCES[e.target.value][0]); }} className="w-full border rounded-xl px-4 py-3 bg-white dark:bg-[#1e3444]">
            {Object.keys(PAKISTAN_PROVINCES).map((p) => <option key={p}>{p}</option>)}
          </select>
          <select value={form.city} onChange={(e) => set("city", e.target.value)} className="w-full border rounded-xl px-4 py-3 bg-white dark:bg-[#1e3444]">
            {PAKISTAN_PROVINCES[form.province].map((c) => <option key={c}>{c}</option>)}
          </select>
          <textarea placeholder="Full delivery address *" value={form.address} onChange={(e) => set("address", e.target.value)} className="w-full border rounded-xl px-4 py-3" rows={3} />
          <textarea placeholder="Order notes (optional)" value={form.notes} onChange={(e) => set("notes", e.target.value)} className="w-full border rounded-xl px-4 py-3" rows={2} />
          <div className="space-y-2">
            <label className="flex gap-2 items-center"><input type="radio" checked={form.payment === "COD"} onChange={() => set("payment", "COD")} /> Cash on Delivery</label>
            <label className="flex gap-2 items-center"><input type="radio" checked={form.payment === "Bank Transfer"} onChange={() => set("payment", "Bank Transfer")} /> Bank Transfer (details shared on WhatsApp after ordering)</label>
          </div>
          {err && <p className="text-red-600">{err}</p>}
          <button onClick={place} disabled={placing} className="w-full bg-[#172b3a] dark:bg-[#aa7f30] text-white rounded-full py-3 font-medium disabled:opacity-50">{placing ? "Placing order…" : "Place Order"}</button>
        </div>
      </div>
      <div>
        <h2 className="font-serif text-2xl font-bold">Order Summary</h2>
        <div className="clay p-5 mt-5 space-y-2">
          {cart.map((i) => <p key={i.product.id + i.size} className="flex justify-between text-sm"><span>{i.product.name} × {i.qty} ({i.size})</span><span>{fmt(i.product.price * i.qty)}</span></p>)}
          <p className="flex justify-between"><span>Subtotal</span><span>{fmt(cartTotal)}</span></p>
          <p className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : fmt(shipping)}</span></p>
          <p className="flex justify-between font-bold text-lg"><span>Total</span><span>{fmt(cartTotal + shipping)}</span></p>
        </div>
      </div>
    </div>
  );
}
