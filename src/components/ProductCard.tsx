"use client";
import Link from "next/link";
import Image from "next/image";
import { Product, fmt } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function ProductCard({ p }: { p: Product }) {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const wished = wishlist.includes(p.id);
  return (
    <div className="clay overflow-hidden flex flex-col">
      <Link href={`/product/${p.id}`} className="relative block aspect-[4/5] overflow-hidden bg-[#e9dfd0]">
        <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
        {p.oldPrice && <span className="absolute top-3 left-3 bg-[#aa7f30] text-white text-xs px-2 py-1 rounded-full">SALE</span>}
        {p.isNew && <span className="absolute top-3 left-3 bg-[#172b3a] text-white text-xs px-2 py-1 rounded-full">NEW</span>}
      </Link>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <p className="text-xs text-[#777777] dark:text-[#e9dfd0]">{p.category} · {p.gender === "ladies" ? "Ladies" : "Men"}</p>
        <Link href={`/product/${p.id}`} className="font-semibold leading-snug hover:text-[#92765c]">{p.name}</Link>
        <p className="font-bold">{fmt(p.price)} {p.oldPrice && <span className="text-sm font-normal line-through text-[#777777]">{fmt(p.oldPrice)}</span>}</p>
        <div className="flex gap-2 mt-auto pt-2">
          <button onClick={() => addToCart(p, p.sizes[1] ?? p.sizes[0], p.colors[0])} className="flex-1 bg-[#172b3a] dark:bg-[#aa7f30] text-white rounded-full py-2 text-sm font-medium">Quick Add</button>
          <button onClick={() => toggleWishlist(p.id)} aria-label="Wishlist" className="w-9 h-9 rounded-full border border-[#e9dfd0] flex items-center justify-center">{wished ? "♥" : "♡"}</button>
        </div>
      </div>
    </div>
  );
}
