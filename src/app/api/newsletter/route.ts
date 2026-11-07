import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || !email.includes("@")) return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  const db = createServerClient();
  if (db) {
    const { error } = await db.from("subscribers").insert({ email });
    if (error && !error.message.includes("duplicate")) return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
