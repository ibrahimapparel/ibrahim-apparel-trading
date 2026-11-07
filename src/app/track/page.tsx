"use client";
import { useState } from "react";
import { fmt } from "@/lib/products";

export default function TrackPage() {
  const [num, setNum] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<{ status: string; total?: number } | null>(null);
  const [msg, setMsg] = useState("");
  const lookup = async () => {
    setMsg(""); setResult(null);
    try {
      const r = await fetch(`/api/orders?orderNumber=${encodeURIComponent(num)}&phone=${encodeURIComponent(phone)}`);
      const j = await r.json();
      if (j.found) setResult(j.order);
      else setMsg(j.demo ? "Order not found in the live database. In demo mode, only the order placed in this browser is stored — check the order number and phone, or place a test order first." : "Order not found. Check the order number and phone number.");
    } catch { setMsg("Could not reach the server. Try again."); }
  };
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-bold">Track Your Order</h1>
      <p className="text-[#777777] mt-2">Enter your order number (e.g. IF-2026-1001) and the phone number used at checkout.</p>
      <div className="clay p-5 mt-6 space-y-3">
        <input placeholder="Order number" value={num} onChange={(e) => setNum(e.target.value)} className="w-full border rounded-xl px-4 py-3" />
        <input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded-xl px-4 py-3" />
        <button onClick={lookup} className="w-full bg-[#172b3a] dark:bg-[#aa7f30] text-white rounded-full py-3 font-medium">Track Order</button>
        {msg && <p className="text-sm text-[#777777]">{msg}</p>}
        {result && (
          <div className="pt-3">
            <p className="font-semibold">Status: {result.status}</p>
            {result.total !== undefined && <p>Total: {fmt(result.total)}</p>}
            <ol className="mt-3 space-y-1 text-sm">
              {["Order Received", "Confirmed", "Processing", "Dispatched", "Out for Delivery", "Delivered"].map((s) => (
                <li key={s} className={result.status === s ? "font-bold text-[#92765c]" : ""}>{s}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
