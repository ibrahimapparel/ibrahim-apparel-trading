"use client";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { fmt, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/products";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal, clearCart } = useStore();
  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0 ? 0 : SHIPPING_FEE;
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl font-bold">Your Cart</h1>
      {cart.length === 0 ? <p className="py-10">Your cart is empty. <Link href="/" className="underline">Continue shopping</Link></p> : (
        <>
          <div className="space-y-4 mt-6">
            {cart.map((item) => (
              <div key={item.product.id + item.size} className="clay p-4 flex gap-4 items-center">
                <Image src={item.product.image} alt={item.product.name} width={80} height={100} className="w-20 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <Link href={`/product/${item.product.id}`} className="font-semibold">{item.product.name}</Link>
                  <p className="text-sm text-[#777777]">Size {item.size} · {item.color}</p>
                  <p className="font-bold mt-1">{fmt(item.product.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.product.id, item.size, item.qty - 1)} className="w-8 h-8 rounded-full border">−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.product.id, item.size, item.qty + 1)} className="w-8 h-8 rounded-full border">+</button>
                </div>
                <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-sm underline">Remove</button>
              </div>
            ))}
          </div>
          <div className="clay p-5 mt-6 space-y-2">
            <p className="flex justify-between"><span>Subtotal</span><span>{fmt(cartTotal)}</span></p>
            <p className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : fmt(shipping)}</span></p>
            <p className="flex justify-between font-bold text-lg"><span>Total</span><span>{fmt(cartTotal + shipping)}</span></p>
            {cartTotal < FREE_SHIPPING_THRESHOLD && <p className="text-sm text-[#777777]">Add {fmt(FREE_SHIPPING_THRESHOLD - cartTotal)} more for free shipping.</p>}
            <div className="flex gap-3 pt-2">
              <Link href="/checkout" className="flex-1 text-center bg-[#172b3a] dark:bg-[#aa7f30] text-white rounded-full py-3 font-medium">Proceed to Checkout</Link>
              <button onClick={clearCart} className="px-5 rounded-full border">Clear</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
