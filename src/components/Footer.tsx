import Link from "next/link";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="bg-[#172b3a] text-[#faf8f4] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.ibb.co/FbPXsc47/image.png" alt="Ibrahim Apparel & Trading (Private) Limited" className="h-12 w-auto" />
          <p className="text-sm text-[#e9dfd0] mt-3">Comfort Meets Class. Premium winter essentials, delivered across Pakistan.</p>
          <p className="text-sm mt-3">WhatsApp: <a className="underline" href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}>{WHATSAPP_DISPLAY}</a></p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm text-[#e9dfd0]">
            <li><Link href="/collection/winters">Winters</Link></li>
            <li><Link href="/collection/ladies">Ladies</Link></li>
            <li><Link href="/collection/shirts">Shirts</Link></li>
            <li><Link href="/collection/pants">Pants</Link></li>
            <li><Link href="/collection/sale">Sale</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Help</h3>
          <ul className="space-y-2 text-sm text-[#e9dfd0]">
            <li><Link href="/track">Track Order</Link></li>
            <li><Link href="/account">My Account</Link></li>
            <li><Link href="/cart">Cart</Link></li>
            <li><Link href="/search">Search</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">About</h3>
          <p className="text-sm text-[#e9dfd0]">IBRAHIM APPAREL &amp; TRADING (PRIVATE) LIMITED — winter clothing and apparel, made for Pakistan.</p>
          <p className="text-sm text-[#e9dfd0] mt-2">Cash on Delivery available nationwide. Free shipping on orders over Rs 5,000.</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-[#e9dfd0]">© 2026 Ibrahim Apparel &amp; Trading (Private) Limited. All rights reserved.</div>
    </footer>
  );
}
