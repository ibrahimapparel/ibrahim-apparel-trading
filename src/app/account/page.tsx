"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function AccountPage() {
  const { user, loading, configured, signUp, signIn, signOut, resetPassword } = useAuth();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  if (loading) return <div className="max-w-xl mx-auto px-4 py-16">Loading…</div>;
  if (!configured) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl font-bold">My Account</h1>
        <div className="clay p-5 mt-5 text-sm">
          <p className="font-semibold">Accounts are not connected yet.</p>
          <p className="mt-2 text-[#777777]">This store uses Supabase Auth. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel (see README.md), run the schema in Supabase, and accounts will work here — sign up with email verification, login, and forgot-password by email. No passwords are ever stored by this site itself.</p>
        </div>
      </div>
    );
  }
  if (user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl font-bold">My Account</h1>
        <div className="clay p-5 mt-5">
          <p><strong>Name:</strong> {(user.user_metadata?.full_name as string) || "—"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {(user.user_metadata?.phone as string) || "—"}</p>
          <p className="text-sm text-[#777777] mt-3">Your orders are linked to this account. Track any order from the Track page with its order number + phone.</p>
          <div className="flex gap-3 mt-5">
            <Link href="/track" className="bg-[#172b3a] text-white px-5 py-2 rounded-full">Track Order</Link>
            <button onClick={signOut} className="border px-5 py-2 rounded-full">Log Out</button>
          </div>
        </div>
      </div>
    );
  }
  const submit = async () => {
    setErr(""); setMsg("");
    if (mode === "register") {
      if (password.length < 6) { setErr("Password must be at least 6 characters."); return; }
      const r = await signUp(email, password, name, phone);
      if (r.error) setErr(r.error); else setMsg("Account created. Please check your email to verify your account, then log in.");
    } else if (mode === "login") {
      const r = await signIn(email, password);
      if (r.error) setErr(r.error);
    } else {
      const r = await resetPassword(email);
      if (r.error) setErr(r.error); else setMsg("Password reset email sent — check your inbox.");
    }
  };
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl font-bold">{mode === "login" ? "Log In" : mode === "register" ? "Create Account" : "Reset Password"}</h1>
      <div className="clay p-5 mt-5 space-y-3">
        {mode === "register" && <>
          <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-xl px-4 py-3" />
          <input placeholder="Phone — 03XX XXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded-xl px-4 py-3" />
        </>}
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-xl px-4 py-3" />
        {mode !== "forgot" && <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-xl px-4 py-3" />}
        {err && <p className="text-red-600 text-sm">{err}</p>}
        {msg && <p className="text-green-700 text-sm">{msg}</p>}
        <button onClick={submit} className="w-full bg-[#172b3a] dark:bg-[#aa7f30] text-white rounded-full py-3 font-medium">{mode === "login" ? "Log In" : mode === "register" ? "Create Account" : "Send Reset Email"}</button>
        <div className="flex justify-between text-sm">
          <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="underline">{mode === "login" ? "Create an account" : "Back to login"}</button>
          <button onClick={() => setMode("forgot")} className="underline">Forgot password?</button>
        </div>
        <p className="text-xs text-[#777777]">Guest checkout is also available — you can order without an account.</p>
      </div>
    </div>
  );
}
