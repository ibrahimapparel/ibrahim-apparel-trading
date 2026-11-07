import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, HERO_FLATLAY, HERO_MOBILE, fmt } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const puffer = PRODUCTS.find((p) => p.id === "p1")!;
  const shawl = PRODUCTS.find((p) => p.id === "l7")!;
  const featured = PRODUCTS.filter((p) => p.isNew);
  // Best Sellers must be distinct from New Arrivals — only non-new products here.
  const best = PRODUCTS.filter((p) => !p.isNew).slice(0, 8);
  return (
    <div>
      {/* Editorial / Magazine hero — desktop/tablet only */}
      <section className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-8 text-center">
          <p className="tracking-[0.3em] text-[#aa7f30] text-sm font-semibold">NEW WINTER COLLECTION 2026</p>
          <h1 className="font-serif text-6xl lg:text-7xl font-bold text-[#172b3a] dark:text-[#faf8f4] mt-3">WINTER, REDEFINED.</h1>
          <p className="text-[#777777] dark:text-[#e9dfd0] text-lg mt-3">Premium winter essentials. Comfort Meets Class.</p>
          <div className="flex gap-3 justify-center mt-6">
            <Link href="/collection/winters" className="clay-btn bg-[#172b3a] dark:bg-[#aa7f30] text-white px-7 py-3 rounded-full font-medium">SHOP WINTER COLLECTION</Link>
            <Link href="/collection/new-arrivals" className="clay-btn bg-white dark:bg-[#1a2d3a] border border-[#92765c] text-[#172b3a] dark:text-[#faf8f4] px-7 py-3 rounded-full font-medium">EXPLORE NEW ARRIVALS</Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-12 relative">
          <div className="clay overflow-hidden relative">
            <Image src={HERO_FLATLAY} alt="Folded winter garments — navy puffer, beige sweater, cream shawl" width={1600} height={900} className="w-full h-[420px] object-cover" priority />
          </div>
          <Link href={`/product/${puffer.id}`} className="clay absolute left-8 bottom-16 px-4 py-3 flex items-center gap-3 bg-white/95">
            <Image src={puffer.image} alt={puffer.name} width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
            <span><span className="block font-semibold text-sm">{puffer.name}</span><span className="text-sm text-[#92765c] font-bold">{fmt(puffer.price)}</span></span>
          </Link>
          <Link href={`/product/${shawl.id}`} className="clay absolute right-8 top-24 px-4 py-3 flex items-center gap-3 bg-white/95">
            <Image src={shawl.image} alt={shawl.name} width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
            <span><span className="block font-semibold text-sm">{shawl.name}</span><span className="text-sm text-[#92765c] font-bold">{fmt(shawl.price)}</span></span>
          </Link>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-4 flex flex-wrap justify-center gap-6 text-sm text-[#777777] dark:text-[#e9dfd0]">
          <span>Cash on Delivery</span><span>Nationwide Delivery</span><span>Free shipping over Rs 5,000</span><span>Easy Exchange</span>
        </div>
      </section>

      {/* Previous simple hero — mobile only */}
      <section className="md:hidden">
        <div className="px-4 pt-8 pb-6 text-center">
          <p className="tracking-[0.25em] text-[#aa7f30] text-xs font-semibold">NEW WINTER COLLECTION 2026</p>
          <h1 className="font-serif text-4xl font-bold mt-2">WINTER, REDEFINED.</h1>
          <p className="text-[#777777] dark:text-[#e9dfd0] mt-2">Premium winter essentials. Comfort Meets Class.</p>
          <div className="flex gap-2 justify-center mt-4">
            <Link href="/collection/winters" className="bg-[#172b3a] text-white px-5 py-3 rounded-full text-sm font-medium">SHOP WINTER</Link>
            <Link href="/collection/new-arrivals" className="border border-[#92765c] px-5 py-3 rounded-full text-sm font-medium">NEW ARRIVALS</Link>
          </div>
          <div className="clay overflow-hidden mt-6">
            <Image src={HERO_MOBILE} alt="Winter jacket" width={900} height={700} className="w-full h-64 object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="font-serif text-3xl font-bold mb-1">Shop by Category</h2>
        <p className="text-[#777777] dark:text-[#e9dfd0] mb-6">Winters, Shirts, Pants, Korean Trousers, Casual Wear &amp; Ladies.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[["Winters", "winters", PRODUCTS[0].image], ["Ladies", "ladies", PRODUCTS[14].image], ["Shirts", "shirts", PRODUCTS[5].image], ["Pants", "pants", PRODUCTS[11].image], ["Hoodies", "winters", PRODUCTS[3].image], ["Sale", "sale", "/images/heritage-bomber-jacket.webp"]].map(([label, slug, img]) => (
            <Link key={label} href={`/collection/${slug}`} className="clay overflow-hidden block">
              <Image src={img as string} alt={label as string} width={400} height={300} className="w-full h-36 object-cover" />
              <p className="p-3 font-semibold text-center">{label}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="font-serif text-3xl font-bold mb-6">New Arrivals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="font-serif text-3xl font-bold mb-6">Best Sellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{best.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
    </div>
  );
}
