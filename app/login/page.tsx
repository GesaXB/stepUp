"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Zap, Globe, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // Security: Block potentially dangerous characters for UI-level safety
  const blockRestrictedChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const restricted = ['"', "'", '<', '>', '&', '$', '{', '}', '[', ']', ';', '\\', '|', '^', '%', '*', '=', '+'];
    if (restricted.includes(e.key)) {
      e.preventDefault();
    }
  };

  const sanitizeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[<>"'&${}[\];\\|^%*=+]/g, '');
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to login");
      }

      setSuccess(true);
      // Redirect after success
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Section: Visual & UX Info */}
        <section className="hidden md:flex w-1/2 relative bg-zinc-50 overflow-hidden flex-col justify-center p-24 pt-[110px]">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
          />
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 space-y-12"
          >
            <div className="space-y-4">
               <div className="flex items-center gap-4 opacity-40">
                  <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">System Access</span>
                  <div className="w-12 h-px bg-black" />
               </div>
               <h2 className="text-[80px] font-black uppercase italic tracking-tighter leading-[0.85] text-black">
                  Step Into <br />
                  <span className="text-zinc-300">The Vault.</span>
               </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 max-w-md">
               {[
                 { icon: <ShieldCheck size={20} />, title: "Secure Protocol", desc: "Military-grade encryption for your personal data." },
                 { icon: <Zap size={20} />, title: "Instant Sync", desc: "Your wishlist and cart synced across all nodes." },
                 { icon: <Globe size={20} />, title: "Priority Drops", desc: "Members get 15-minute early access to limited series." }
               ].map((item, i) => (
                 <motion.div 
                   key={item.title}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
                   className="flex items-start gap-5 p-6 bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow group"
                 >
                    <div className="text-black group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                    <div className="space-y-1">
                       <h4 className="text-[12px] font-black uppercase tracking-widest italic">{item.title}</h4>
                       <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-tight leading-relaxed">{item.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
          </motion.div>

          {/* Floating Editorial Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/2 right-[-10%] translate-y-[-50%] w-[60%] aspect-square pointer-events-none grayscale"
          >
             <Image src="/images/hero-main.png" alt="Ornament" fill className="object-contain" />
          </motion.div>
        </section>

        {/* Right Section: Auth Form */}
        <section className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24 bg-white relative pt-[150px] md:pt-[150px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full max-w-sm"
          >
            <div className="mb-12 space-y-4">
               <div className="flex items-center gap-4 opacity-40 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest italic">Auth Protocol V.01</span>
                  <div className="w-12 h-px bg-black" />
               </div>
               <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">
                  Welcome <br /> <span className="text-zinc-200">Back.</span>
               </h1>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
               {error && (
                 <motion.div 
                   initial={{ opacity: 0, height: 0 }} 
                   animate={{ opacity: 1, height: "auto" }}
                   className="p-4 bg-red-50 border-l-2 border-red-500 text-red-600 text-[10px] font-black uppercase tracking-widest italic"
                 >
                   {error}
                 </motion.div>
               )}

               {success && (
                 <motion.div 
                   initial={{ opacity: 0, height: 0 }} 
                   animate={{ opacity: 1, height: "auto" }}
                   className="p-4 bg-zinc-900 border-l-2 border-zinc-100 text-white text-[10px] font-black uppercase tracking-widest italic"
                 >
                   ACCESS GRANTED. SYNCING NODE...
                 </motion.div>
               )}

               <div className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 group-focus-within:text-black transition-colors italic">Email Node</label>
                  <input 
                    type="email" 
                    required
                    onKeyDown={blockRestrictedChars}
                    onChange={(e) => {
                      sanitizeInput(e);
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    placeholder="ENTER REGISTERED EMAIL..."
                    className="w-full border-b-2 border-zinc-100 py-4 outline-none focus:border-black transition-all text-[13px] font-black italic placeholder:text-zinc-200 placeholder:italic tracking-widest"
                  />
               </div>

               <div className="space-y-2 group relative">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 group-focus-within:text-black transition-colors italic">Access Key</label>
                    <Link href="#" className="text-[9px] font-black uppercase text-zinc-300 hover:text-black transition-colors italic border-b border-zinc-200 hover:border-black">Lost Access?</Link>
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    onKeyDown={blockRestrictedChars}
                    onChange={(e) => {
                      sanitizeInput(e);
                      setFormData({ ...formData, password: e.target.value });
                    }}
                    placeholder="••••••••"
                    className="w-full border-b-2 border-zinc-100 py-4 outline-none focus:border-black transition-all text-[13px] font-black italic placeholder:text-zinc-200 transition-all tracking-[0.5em]"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 bottom-4 text-zinc-300 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
               </div>

               <div className="pt-6 space-y-8">
                  <button 
                    disabled={loading}
                    className="w-full bg-black text-white py-6 flex items-center justify-center gap-5 group overflow-hidden relative active:scale-[0.98] transition-transform shadow-xl disabled:opacity-50"
                  >
                     <span className={`text-[12px] font-black uppercase tracking-[0.3em] italic relative z-10 ${loading ? '-translate-y-12' : ''} group-hover:-translate-y-12 transition-transform duration-500`}>Authorize Access</span>
                     <span className={`text-[12px] font-black uppercase tracking-[0.3em] italic absolute ${loading ? 'translate-y-0' : 'translate-y-12'} group-hover:translate-y-0 transition-transform duration-500`}>Processing...</span>
                     <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </button>

                  <div className="flex items-center gap-6">
                     <span className="text-zinc-300 text-[9px] font-black uppercase tracking-widest">Protocol 02</span>
                     <Link href="/register" className="text-[11px] font-black uppercase italic tracking-widest border-b-2 border-black pb-1 hover:opacity-50 transition-all">
                        Initiate New Account
                     </Link>
                  </div>
               </div>
            </form>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
