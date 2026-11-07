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
        <p className="font-bold flex items-baseline gap-2">
          <span>{fmt(p.price)}</span>
          {p.oldPrice && <span className="text-sm font-normal line-through text-[#777777]">{fmt(p.oldPrice)}</span>}
        </p>
        <div className="flex gap-2 mt-auto pt-2">
          <button onClick={() => addToCart(p, p.sizes[1] ?? p.sizes[0], p.colors[0])} className="clay-btn flex-1 bg-[#172b3a] dark:bg-[#aa7f30] text-white rounded-full py-2 text-sm font-medium">Quick Add</button>
          <button onClick={() => toggleWishlist(p.id)} aria-label="Wishlist" className="w-9 h-9 rounded-full clay-sm flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill={wished ? "#92765c" : "none"} stroke="#92765c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
              <path d="M12 20.5C7 16.5 3 13.3 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 4-4 7.2-9 11.2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
