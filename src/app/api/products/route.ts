import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";
import { createAdminClient, createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const db = createServerClient();
  if (db) {
    const { data, error } = await db.from("products").select("*").eq("active", true).order("created_at");
    if (!error && data && data.length > 0) return NextResponse.json(data);
  }
  return NextResponse.json(PRODUCTS);
}

async function requireAdmin(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.replace("Bearer ", "");
  if (!token) return null;
  const db = createServerClient();
  if (!db) return null;
  const { data: { user } } = await db.auth.getUser(token);
  if (!user) return null;
  const { data: p } = await db.from("profiles").select("is_admin").eq("id", user.id).single();
  return (p as { is_admin?: boolean } | null)?.is_admin ? user : null;
}

export async function POST(req: Request) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: "Admin only" }, { status: 403 });
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  const body = await req.json();
  const { error } = await admin.from("products").insert(body);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
