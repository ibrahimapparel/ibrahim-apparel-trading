"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NAV, WHATSAPP_NUMBER } from "@/lib/products";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";

const LOGO_LIGHT = "https://i.ibb.co/BVjN8qvx/Ibrahim-Apparel-Trading-Logo.png";
const LOGO_DARK = "https://i.ibb.co/FbPXsc47/image.png";

/* Clean SVG line icons in navy/mocha — same set as the HTML store */
const ICON = "w-5 h-5";
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#92765c" strokeWidth="1.8" strokeLinecap="round" className={ICON} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#172b3a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={ICON} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#172b3a" strokeWidth="1.8" strokeLinecap="round" className={ICON} aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" />
    </svg>
  );
}
function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "#92765c" : "none"} stroke="#92765c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true">
      <path d="M12 20.5C7 16.5 3 13.3 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 4-4 7.2-9 11.2z" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#172b3a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={ICON} aria-hidden="true">
      <path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1H5.5a1 1 0 0 1-1-1.1L6 7z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </svg>
  );
}

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
    <button onClick={toggle} aria-label="Toggle theme" className="w-9 h-9 rounded-full clay clay-sm flex items-center justify-center">
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default function Header() {
  const { cartCount, wishlist } = useStore();
  const { user } = useAuth();
  const [open, setOpen] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f4]/95 dark:bg-[#172b3a]/95 backdrop-blur border-b border-[#e9dfd0] dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center gap-3">
        <button className="lg:hidden w-9 h-9 rounded-full clay clay-sm flex items-center justify-center" onClick={() => setMenu(!menu)} aria-label="Menu"><MenuIcon /></button>
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
                  <div className="clay clay-sm p-3 min-w-[220px] grid grid-cols-1">
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
        <Link href="/account" aria-label="Account" className="w-9 h-9 rounded-full clay clay-sm hidden sm:flex items-center justify-center" title={user ? user.email : "Account"}><UserIcon /></Link>
        <Link href="/wishlist" aria-label="Wishlist" className="relative w-9 h-9 rounded-full clay clay-sm hidden sm:flex items-center justify-center"><HeartIcon filled={wishlist.length > 0} />{wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-[#92765c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>}</Link>
        <Link href="/cart" aria-label="Cart" className="relative w-9 h-9 rounded-full clay clay-sm flex items-center justify-center"><CartIcon />{cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#172b3a] dark:bg-[#aa7f30] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}</Link>
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
  const half = (
    <span className="flex shrink-0 items-center">
      <span className="px-6">{text}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#aa7f30] shrink-0" aria-hidden="true" />
    </span>
  );
  return (
    <div className="hidden md:block bg-[#172b3a] text-[#faf8f4] overflow-hidden text-sm">
      <div className="announce-track flex whitespace-nowrap w-max py-2">
        {half}
        {half}
      </div>
    </div>
  );
}

export function WhatsAppButton() {
  return (
    <a href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent("Hello Ibrahim Apparel & Trading, I need help with my order.")}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white" style={{ background: "#25D366", boxShadow: "6px 6px 14px rgba(23,43,58,.25), -4px -4px 10px rgba(255,255,255,.6), inset 1px 1px 3px rgba(255,255,255,.4)" }}>
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.4 14.1c-.2.7-1.3 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.8 1.7.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .6-.2 1.3z" /></svg>
    </a>
  );
}
