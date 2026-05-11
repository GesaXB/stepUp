"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createBrowserSupabase } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const sanitizeInput = (val: string) => val.replace(/["'<>{} ]/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "System error");

      // Smooth transition to verify page
      window.location.href = `/register/verify?email=${encodeURIComponent(data.email)}`;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    const supabase = createBrowserSupabase();
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col md:flex-row overflow-hidden selection:bg-black selection:text-white font-sans">
      {/* Left Section: Immersive Visual Branding */}
      <section className="hidden md:flex w-1/2 bg-zinc-50 relative flex-col justify-center p-16 lg:p-24 border-r border-black/5 h-full">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
          className="relative z-10 space-y-10"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 opacity-40">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black">Member Registration</span>
              <div className="w-12 h-px bg-black" />
            </div>
            <h2 className="text-7xl lg:text-[80px] font-black italic uppercase leading-[0.8] tracking-tighter text-black">
              Join <br /> <span className="text-zinc-200">The Vault.</span>
            </h2>
          </div>

          <div className="space-y-6 max-w-sm">
            {[
              { icon: <Sparkles size={16} />, text: "Exclusive access to limited archival drops." },
              { icon: <Sparkles size={16} />, text: "Verified digital ownership certificates." },
              { icon: <Sparkles size={16} />, text: "Priority queuing for high-heat releases." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
                className="flex items-center gap-5 text-[11px] font-black uppercase tracking-widest text-zinc-400 group"
              >
                <div className="w-6 h-6 flex items-center justify-center bg-black text-white group-hover:scale-125 transition-transform duration-500">
                  {feature.icon}
                </div>
                {feature.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ambient Branding */}
        <div className="absolute bottom-[-5%] left-[-5%] text-[240px] font-black italic text-black/2 pointer-events-none uppercase tracking-tighter leading-none select-none">
          StepUP
        </div>
      </section>

      {/* Right Section: High-Performance Signup */}
      <section className="w-full md:w-1/2 flex flex-col p-8 md:px-16 lg:px-24 bg-white justify-center h-full pt-[80px] md:pt-[100px] overflow-y-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm z-10 mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8 space-y-4">
             <div className="flex items-center gap-4 opacity-40 mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest italic">Protocol 01</span>
                <div className="w-8 h-px bg-black" />
             </div>
             <h1 className="text-5xl md:text-6xl font-black italic uppercase leading-[0.85] tracking-tighter">
               Create <br /><span className="text-zinc-200">Account.</span>
             </h1>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border-l-2 border-red-500 p-5 text-[10px] font-black uppercase italic text-red-600 tracking-widest"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {[
                { label: "Full Name", id: "name", type: "text", placeholder: "NAME..." },
                { label: "Email Address", id: "email", type: "email", placeholder: "NAME@SYSTEM.COM" },
                { label: "Password", id: "password", type: showPassword ? "text" : "password", placeholder: "••••••••" },
              ].map((field) => (
                <motion.div key={field.id} variants={itemVariants} className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300 group-focus-within:text-black transition-colors italic">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input 
                      type={field.type}
                      required
                      autoComplete={field.id === "password" ? "new-password" : "on"}
                      onChange={(e) => setFormData({ ...formData, [field.id]: sanitizeInput(e.target.value) })}
                      value={formData[field.id as keyof typeof formData]}
                      placeholder={field.placeholder}
                      className="w-full border-b-[1.5px] border-zinc-100 py-4 outline-none focus:border-black transition-all text-[15px] font-black italic placeholder:text-zinc-100 tracking-widest bg-transparent"
                    />
                    {field.id === "password" && (
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 bottom-4 text-zinc-300 hover:text-black transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="pt-4 space-y-4">
              <button 
                disabled={loading || googleLoading}
                className="w-full bg-black text-white py-4 flex items-center justify-center gap-6 group relative overflow-hidden active:scale-[0.98] transition-all duration-500 shadow-2xl disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="text-[13px] font-black uppercase tracking-[0.4em] italic relative z-10 flex items-center gap-4">
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      Register Membership
                      <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform duration-500 ease-out" />
                    </>
                  )}
                </span>
              </button>

              <div className="flex items-center gap-4 py-2">
                <div className="h-px bg-zinc-100 flex-1" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300 italic">OR</span>
                <div className="h-px bg-zinc-100 flex-1" />
              </div>

              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading || googleLoading}
                className="w-full bg-white border border-black text-black py-4 flex items-center justify-center gap-4 group relative overflow-hidden active:scale-[0.98] transition-all duration-500 disabled:opacity-50 hover:bg-zinc-50"
              >
                <span className="text-[13px] font-black uppercase tracking-[0.2em] italic flex items-center gap-3">
                  {googleLoading ? <Loader2 className="animate-spin" size={18} /> : (
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  )}
                  Google Verification
                </span>
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 pb-4">
               <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300">#VaultProtocol</span>
               <Link href="/login" className="text-[12px] font-black uppercase italic border-b-2 border-black pb-1 hover:opacity-50 transition-all tracking-widest">
                  Sign In Access
               </Link>
            </motion.div>
          </form>
        </motion.div>

        {/* Floating Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-50 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2" />
      </section>
    </div>
  );
}
