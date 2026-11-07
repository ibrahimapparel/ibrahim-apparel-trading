import { NextResponse } from "next/server";
import { createAdminClient, createServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();
  const db = createAdminClient() ?? createServerClient();
  if (!db) {
    // Demo mode (no Supabase yet): accept the order, return the order number.
    // Nothing is stored centrally — the client also saves it in localStorage.
    return NextResponse.json({ ok: true, demo: true, orderNumber: body.orderNumber, status: "Order Received" });
  }
  const { data: order, error } = await db.from("orders").insert({
    order_number: body.orderNumber,
    customer_name: body.customer?.name,
    customer_phone: body.customer?.phone,
    customer_email: body.customer?.email || null,
    province: body.customer?.province,
    city: body.customer?.city,
    address: body.customer?.address,
    payment_method: body.customer?.payment,
    subtotal: body.subtotal,
    shipping: body.shipping,
    total: body.total,
    status: "Order Received",
  }).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  const items = (body.items ?? []).map((i: { product: { id: string; name: string; price: number }; size: string; color: string; qty: number }) => ({
    order_id: (order as { id: string }).id,
    product_id: i.product.id,
    product_name: i.product.name,
    size: i.size,
    color: i.color,
    qty: i.qty,
    price: i.product.price,
  }));
  if (items.length) await db.from("order_items").insert(items);
  return NextResponse.json({ ok: true, orderNumber: body.orderNumber, status: "Order Received" });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const orderNumber = url.searchParams.get("orderNumber") || "";
  const phone = url.searchParams.get("phone") || "";
  if (!orderNumber || !phone) return NextResponse.json({ found: false });
  const db = createServerClient();
  if (!db) return NextResponse.json({ found: false, demo: true });
  const { data } = await db.from("orders").select("status,total").eq("order_number", orderNumber).eq("customer_phone", phone).single();
  if (!data) return NextResponse.json({ found: false });
  return NextResponse.json({ found: true, order: data });
}
