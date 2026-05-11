"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Eye, EyeOff } from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const supabase = createBrowserSupabase();

  // Redirect if not authorized (should have a token in URL hash)
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      // Supabase automatically logs in the user temporarily when they click the reset link
      if (!session) {
        // This might happen if they visit the page directly without a link
      }
    };
    checkSession();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Update password in Supabase Auth
      const { error: resetError } = await supabase.auth.updateUser({
        password: password
      });

      if (resetError) throw resetError;

      // 2. Update password in Prisma as well (sync)
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to sync password with system.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8 pt-[150px] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-12 relative z-10"
      >
        <div className="space-y-4">
           <div className="flex items-center gap-4 opacity-40">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Vault Access</span>
              <div className="w-12 h-px bg-black" />
           </div>
           <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.9]">
              Define <br /> <span className="text-zinc-200">New Key.</span>
           </h1>
           <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
             Establish a new cryptographic password for your account.
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-4 bg-red-50 border-l-2 border-red-500 text-red-600 text-[10px] font-black uppercase tracking-widest italic">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-black text-white text-[10px] font-black uppercase tracking-widest italic animate-pulse">
              PASSWORD SECURED. REDIRECTING TO LOGIN...
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2 group relative">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">New Password</label>
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border-b-2 border-zinc-100 py-4 outline-none focus:border-black transition-all text-[13px] font-black italic placeholder:text-zinc-200 tracking-[0.5em]"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-4 text-zinc-300 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="space-y-2 group">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">Confirm Password</label>
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border-b-2 border-zinc-100 py-4 outline-none focus:border-black transition-all text-[13px] font-black italic placeholder:text-zinc-200 tracking-[0.5em]"
              />
            </div>
          </div>

          <button 
            disabled={loading || success}
            className="w-full bg-black text-white py-6 flex items-center justify-center gap-5 group overflow-hidden relative active:scale-[0.98] transition-transform shadow-xl disabled:opacity-50"
          >
             <span className="text-[12px] font-black uppercase tracking-[0.3em] italic relative z-10 transition-transform duration-500">
               {loading ? "Updating..." : "Update Password"}
             </span>
             <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
          </button>
        </form>

        <div className="pt-12 flex flex-col items-center gap-4 text-zinc-300">
           <div className="h-px w-12 bg-zinc-100" />
           <span className="text-[9px] font-black uppercase tracking-[0.4em]">StepUP Security V.04</span>
        </div>
      </motion.div>
    </div>
  );
}
