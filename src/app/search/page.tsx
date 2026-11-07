import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const list = q ? PRODUCTS.filter((p) => (p.name + " " + p.category + " " + p.collection).toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold">Search {q && `for “${q}”`}</h1>
      <p className="text-[#777777] mt-1">{list.length} results</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </div>
  );
}
