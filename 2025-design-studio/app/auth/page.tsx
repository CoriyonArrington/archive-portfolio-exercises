"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  // these NEXT_PUBLIC_ vars must be defined in .env.local
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://bmkezkovrcocmmqupifp.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJta2V6a292cmNvY21tcXVwaWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2ODU2NDEsImV4cCI6MjA2MDI2MTY0MX0.ktloV2mkqVeAPLbbq2ZeLv1d26yIRJYapWkouUHkmsA";

  // only instantiated in the browser
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      // on success, go straight into the dashboard
      router.push("/admin/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-semibold mb-6">Admin Sign In</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-500 text-white rounded px-3 py-2 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
      {!supabaseUrl || !supabaseKey ? (
        <p className="mt-4 text-red-600">
          ⚠️ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY
        </p>
      ) : null}
    </div>
  );
}
