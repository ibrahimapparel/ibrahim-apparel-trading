"use client";
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Product } from "./products";

export type CartItem = { product: Product; size: string; color: string; qty: number };

type Store = {
  cart: CartItem[];
  addToCart: (p: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQty: (id: string, size: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("iat-cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("iat-wishlist") || "[]"));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem("iat-cart", JSON.stringify(cart)); }, [cart, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem("iat-wishlist", JSON.stringify(wishlist)); }, [wishlist, loaded]);

  const addToCart = useCallback((p: Product, size: string, color: string, qty = 1) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.product.id === p.id && x.size === size && x.color === color);
      if (i >= 0) { const n = [...c]; n[i] = { ...n[i], qty: n[i].qty + qty }; return n; }
      return [...c, { product: p, size, color, qty }];
    });
  }, []);
  const removeFromCart = useCallback((id: string, size: string) => setCart((c) => c.filter((x) => !(x.product.id === id && x.size === size))), []);
  const updateQty = useCallback((id: string, size: string, qty: number) => setCart((c) => qty <= 0 ? c.filter((x) => !(x.product.id === id && x.size === size)) : c.map((x) => x.product.id === id && x.size === size ? { ...x, qty } : x)), []);
  const clearCart = useCallback(() => setCart([]), []);
  const toggleWishlist = useCallback((id: string) => setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]), []);

  const cartTotal = cart.reduce((s, x) => s + x.product.price * x.qty, 0);
  const cartCount = cart.reduce((s, x) => s + x.qty, 0);
  return <Ctx.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount, wishlist, toggleWishlist }}>{children}</Ctx.Provider>;
}
export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside provider");
  return v;
}
