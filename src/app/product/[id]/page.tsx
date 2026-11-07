"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, fmt } from "@/lib/products";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Next 16: params is a promise in server components; this client page receives it via wrapper below.
  return <ProductInner params={params} />;
}

import { use } from "react";
function ProductInner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const p = PRODUCTS.find((x) => x.id === id);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [size, setSize] = useState("");
  const [color, setColor] = useState(p?.colors[0] ?? "");
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState("");
  const [added, setAdded] = useState(false);
  if (!p) return <div className="max-w-7xl mx-auto px-4 py-16">Product not found. <Link href="/" className="underline">Back home</Link></div>;
  const related = PRODUCTS.filter((x) => x.collection === p.collection && x.id !== p.id).slice(0, 4);
  const buy = () => {
    if (!size) { setErr("Please select a size first."); return; }
    setErr(""); addToCart(p, size, color, qty); setAdded(true);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm underline">← Back</Link>
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div className="clay overflow-hidden"><Image src={p.image} alt={p.name} width={900} height={1100} className="w-full aspect-[4/5] object-cover" /></div>
        <div>
          <p className="text-sm text-[#777777]">{p.category} · {p.gender === "ladies" ? "Ladies" : "Men"}</p>
          <h1 className="font-serif text-4xl font-bold mt-1">{p.name}</h1>
          <p className="text-2xl font-bold mt-3">{fmt(p.price)} {p.oldPrice && <span className="text-base font-normal line-through text-[#777777]">{fmt(p.oldPrice)}</span>}</p>
          <p className="mt-4 text-[#555] dark:text-[#e9dfd0]">{p.description}</p>
          <p className="mt-4 text-sm">Stock: {p.stock} available</p>
          <h2 className="font-semibold mt-6">Select Size {size ? `— ${size}` : "(required)"}</h2>
          <div className="flex gap-2 flex-wrap mt-2">
            {p.sizes.map((s) => <button key={s} onClick={() => setSize(s)} className={`px-4 py-2 rounded-full border ${size === s ? "bg-[#172b3a] dark:bg-[#aa7f30] text-white" : "bg-white dark:bg-[#1e3444]"}`}>{s}</button>)}
          </div>
          <h2 className="font-semibold mt-6">Select Colour — {color}</h2>
          <div className="flex gap-2 flex-wrap mt-2">
            {p.colors.map((c) => <button key={c} onClick={() => setColor(c)} className={`px-4 py-2 rounded-full border ${color === c ? "bg-[#172b3a] dark:bg-[#aa7f30] text-white" : "bg-white dark:bg-[#1e3444]"}`}>{c}</button>)}
          </div>
          <div className="flex items-center gap-3 mt-6">
            <span className="font-semibold">Quantity</span>
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-full border">−</button>
            <span className="w-6 text-center">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-full border">+</button>
          </div>
          {err && <p className="text-red-600 mt-3">{err}</p>}
          {added && <p className="text-green-700 mt-3">Added to cart ✓ <Link href="/cart" className="underline">View cart</Link></p>}
          <div className="flex gap-3 mt-6">
            <button onClick={buy} className="flex-1 bg-[#172b3a] dark:bg-[#aa7f30] text-white rounded-full py-3 font-medium">Add to Cart</button>
            <button onClick={() => toggleWishlist(p.id)} className="px-5 rounded-full border">{wishlist.includes(p.id) ? "♥ Saved" : "♡ Wishlist"}</button>
          </div>
          <p className="text-sm text-[#777777] mt-4">Cash on Delivery available · Free shipping over Rs 5,000 · WhatsApp +92 327 5084710</p>
        </div>
      </div>
      <h2 className="font-serif text-3xl font-bold mt-12 mb-6">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{related.map((x) => <ProductCard key={x.id} p={x} />)}</div>
    </div>
  );
}
