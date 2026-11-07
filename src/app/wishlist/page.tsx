"use client";
import { useStore } from "@/lib/store";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
export default function WishlistPage() {
  const { wishlist } = useStore();
  const list = PRODUCTS.filter((p) => wishlist.includes(p.id));
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl font-bold">Your Wishlist</h1>
      {list.length === 0 ? <p className="py-10">Your wishlist is empty.</p> : <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
    </div>
  );
}
