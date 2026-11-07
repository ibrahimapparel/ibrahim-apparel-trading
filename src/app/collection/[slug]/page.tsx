import { PRODUCTS, NAV } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default async function CollectionPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ cat?: string; sort?: string }> }) {
  const { slug } = await params;
  const sp = await searchParams;
  const nav = NAV.find((n) => n.slug === slug);
  let list = PRODUCTS.filter((p) => {
    if (slug === "new-arrivals") return p.isNew;
    if (slug === "sale") return Boolean(p.oldPrice);
    if (slug === "korean-trousers") return p.category.includes("Fit") || p.collection === "pants";
    if (slug === "casual-wear") return ["Sweatshirts", "Oversized T-Shirts", "Co-ord Sets"].includes(p.category) || p.collection === "ladies";
    return p.collection === slug;
  });
  if (sp.cat) list = list.filter((p) => p.category === sp.cat);
  if (sp.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sp.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sp.sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  const title = nav?.label ?? slug.replace(/-/g, " ");
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl font-bold capitalize">{title}</h1>
      <p className="text-[#777777] dark:text-[#e9dfd0] mt-1">{list.length} products {sp.cat ? `· ${sp.cat}` : ""}</p>
      <div className="flex gap-2 mt-6 flex-wrap">
        <a href={`/collection/${slug}`} className="px-4 py-2 rounded-full border text-sm">All</a>
        {(nav?.children ?? []).map((c) => (
          <a key={c} href={`/collection/${slug}?cat=${encodeURIComponent(c)}`} className="px-4 py-2 rounded-full border text-sm hover:bg-[#e9dfd0] dark:hover:bg-white/10">{c}</a>
        ))}
        <span className="ml-auto flex gap-2 text-sm">
          <a href={`/collection/${slug}?sort=price-asc`}>Price ↑</a>·<a href={`/collection/${slug}?sort=price-desc`}>Price ↓</a>·<a href={`/collection/${slug}?sort=name`}>Name</a>
        </span>
      </div>
      {list.length === 0 ? <p className="py-12 text-center text-[#777777]">No products in this collection yet.</p> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      )}
    </div>
  );
}
