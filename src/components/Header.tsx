"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NAV, WHATSAPP_NUMBER } from "@/lib/products";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";

const LOGO_LIGHT = "https://i.ibb.co/BVjN8qvx/Ibrahim-Apparel-Trading-Logo.png";
const LOGO_DARK = "https://i.ibb.co/FbPXsc47/image.png";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("iat-theme");
    const d = saved ? saved === "dark" : false;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  const toggle = () => {
    const d = !dark;
    setDark(d);
    localStorage.setItem("iat-theme", d ? "dark" : "light");
    document.documentElement.classList.toggle("dark", d);
  };
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="w-9 h-9 rounded-full clay flex items-center justify-center text-lg">
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

export default function Header() {
  const { cartCount, wishlist } = useStore();
  const { user } = useAuth();
  const [open, setOpen] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f4]/95 dark:bg-[#172b3a]/95 backdrop-blur border-b border-[#e9dfd0] dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center gap-3">
        <button className="lg:hidden text-2xl" onClick={() => setMenu(!menu)} aria-label="Menu">☰</button>
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_LIGHT} alt="Ibrahim Apparel & Trading (Private) Limited" className="h-11 w-auto dark:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_DARK} alt="Ibrahim Apparel & Trading (Private) Limited" className="h-11 w-auto hidden dark:block" />
        </Link>
        <nav className="hidden lg:flex items-center gap-1 mx-auto">
          {NAV.map((n) => (
            <div key={n.slug} className="relative" onMouseEnter={() => setOpen(n.slug)} onMouseLeave={() => setOpen(null)}>
              <Link href={`/collection/${n.slug}`} className="px-3 py-2 text-sm font-medium text-[#242424] dark:text-[#faf8f4] hover:text-[#92765c]">{n.label}</Link>
              {n.children.length > 0 && open === n.slug && (
                <div className="absolute left-0 top-full pt-1 z-50">
                  <div className="clay p-3 min-w-[220px] grid grid-cols-1">
                    {n.children.map((c) => (
                      <Link key={c} href={`/collection/${n.slug}?cat=${encodeURIComponent(c)}`} className="px-3 py-2 rounded-lg text-sm hover:bg-[#e9dfd0] dark:hover:bg-white/10">{c}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <form action="/search" className="hidden md:flex flex-1 max-w-[220px] ml-auto">
          <input name="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="w-full rounded-full border border-[#e9dfd0] bg-white dark:bg-[#1e3444] px-4 py-2 text-sm" />
        </form>
        <ThemeToggle />
        <Link href="/account" aria-label="Account" className="w-9 h-9 rounded-full clay hidden sm:flex items-center justify-center" title={user ? user.email : "Account"}>👤</Link>
        <Link href="/wishlist" aria-label="Wishlist" className="relative w-9 h-9 rounded-full clay hidden sm:flex items-center justify-center">♡{wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-[#92765c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>}</Link>
        <Link href="/cart" aria-label="Cart" className="relative w-9 h-9 rounded-full clay flex items-center justify-center">🛒{cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#172b3a] dark:bg-[#aa7f30] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}</Link>
      </div>
      {menu && (
        <div className="lg:hidden border-t border-[#e9dfd0] dark:border-white/10 px-4 py-3 grid gap-1 bg-[#faf8f4] dark:bg-[#172b3a]">
          {NAV.map((n) => <Link key={n.slug} href={`/collection/${n.slug}`} onClick={() => setMenu(false)} className="py-2 font-medium">{n.label}</Link>)}
          <Link href="/account" onClick={() => setMenu(false)} className="py-2">Account</Link>
          <Link href="/track" onClick={() => setMenu(false)} className="py-2">Track Order</Link>
        </div>
      )}
    </header>
  );
}

export function Ticker() {
  const text = "Premium Winter Collection Now Available · Nationwide Delivery Across Pakistan · Free shipping on orders over Rs 5,000";
  return (
    <div className="hidden md:block bg-[#172b3a] text-[#faf8f4] overflow-hidden text-sm">
      <div className="announce-track flex whitespace-nowrap w-max py-2">
        <span className="px-8">{text} &nbsp;·&nbsp; {text}</span>
        <span className="px-8">{text} &nbsp;·&nbsp; {text}</span>
      </div>
    </div>
  );
}

export function WhatsAppButton() {
  return (
    <a href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent("Hello Ibrahim Apparel & Trading, I need help with my order.")}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-white text-2xl" style={{ background: "#25D366" }}>
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.4 14.1c-.2.7-1.3 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.8 1.7.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .6-.2 1.3z" /></svg>
    </a>
  );
}
