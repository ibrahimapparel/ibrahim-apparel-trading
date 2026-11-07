"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
export default function ResetPasswordPage() {
  const { configured } = useAuth();
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl font-bold">Set a New Password</h1>
      <div className="clay p-5 mt-5 space-y-3">
        <input type="password" placeholder="New password (min 6 characters)" value={pw} onChange={(e) => setPw(e.target.value)} className="w-full border rounded-xl px-4 py-3" />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        {msg && <p className="text-green-700 text-sm">{msg}</p>}
        <button onClick={async () => {
          if (pw.length < 6) { setErr("Password must be at least 6 characters."); return; }
          if (!configured) { setErr("Supabase is not configured yet."); return; }
          const { createClient } = await import("@/lib/supabase/client");
          const { error } = await createClient().auth.updateUser({ password: pw });
          if (error) setErr(error.message); else setMsg("Password updated. You can now log in.");
        }} className="w-full bg-[#172b3a] text-white rounded-full py-3">Update Password</button>
      </div>
    </div>
  );
}
