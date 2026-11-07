"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient, supabaseConfigured } from "./supabase/client";
import type { User } from "@supabase/supabase-js";

type Auth = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  configured: boolean;
  signUp: (email: string, password: string, name: string, phone: string) => Promise<{ error: string | null; needsConfirm?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
};
const Ctx = createContext<Auth | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseConfigured) { setLoading(false); return; }
    const supabase = createClient();
    supabase.auth.getSession().then(async ({ data }) => {
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        const { data: p } = await supabase.from("profiles").select("is_admin").eq("id", data.session.user.id).single();
        setIsAdmin(Boolean((p as { is_admin?: boolean } | null)?.is_admin));
      }
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) setIsAdmin(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, phone: string) => {
    if (!supabaseConfigured) return { error: "Supabase is not configured yet. Add the keys in Vercel env vars (see README)." };
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name, phone }, emailRedirectTo: `${window.location.origin}/account` } });
    return { error: error?.message ?? null, needsConfirm: !error };
  };
  const signIn = async (email: string, password: string) => {
    if (!supabaseConfigured) return { error: "Supabase is not configured yet." };
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };
  const signOut = async () => { if (supabaseConfigured) await createClient().auth.signOut(); setUser(null); setIsAdmin(false); };
  const resetPassword = async (email: string) => {
    if (!supabaseConfigured) return { error: "Supabase is not configured yet." };
    const { error } = await createClient().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/account/reset-password` });
    return { error: error?.message ?? null };
  };
  return <Ctx.Provider value={{ user, isAdmin, loading, configured: supabaseConfigured, signUp, signIn, signOut, resetPassword }}>{children}</Ctx.Provider>;
}
export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth outside provider");
  return v;
}
