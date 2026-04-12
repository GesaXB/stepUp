"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, UserPlus, Fingerprint, Sparkles, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
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
                  <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">Registry Protocol</span>
                  <div className="w-12 h-px bg-black" />
               </div>
               <h2 className="text-[80px] font-black uppercase italic tracking-tighter leading-[0.85] text-black">
                  Join <br />
                  <span className="text-zinc-300">The Elite.</span>
               </h2>
            </div>

            {/* Informative UX Cards */}
            <div className="grid grid-cols-1 gap-6 max-w-md">
               {[
                 { icon: <UserPlus size={20} />, title: "Membership Card", desc: "Digital ownership certificate for every pair purchased." },
                 { icon: <Fingerprint size={20} />, title: "Bio Authentication", desc: "One-tap verification for faster checkout modules." },
                 { icon: <Sparkles size={20} />, title: "Exclusive Raffle", desc: "Automatic entry into monthly archival series drops." }
               ].map((item, i) => (
                 <motion.div 
                   key={item.title}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
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
        </section>

        {/* Right Section: Auth Form */}
        <section className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24 bg-white relative pt-[150px] md:pt-[150px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full max-w-sm px-4 md:px-0"
          >
            <div className="mb-10 space-y-4">
               <div className="flex items-center gap-4 opacity-40 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest italic">New Node Registry V.01</span>
                  <div className="w-12 h-px bg-black" />
               </div>
               <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">
                  Enroll <br /> <span className="text-zinc-200">System.</span>
               </h1>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 group-focus-within:text-black transition-colors italic">Full Identity</label>
                  <input 
                    type="text" 
                    onKeyDown={blockRestrictedChars}
                    onChange={sanitizeInput}
                    placeholder="ENTER YOUR FULL NAME..."
                    className="w-full border-b-2 border-zinc-100 py-3 md:py-4 outline-none focus:border-black transition-all text-[13px] font-black italic placeholder:text-zinc-200 placeholder:italic uppercase tracking-widest"
                  />
               </div>

               <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 group-focus-within:text-black transition-colors italic">Email Node</label>
                  <input 
                    type="email" 
                    onKeyDown={blockRestrictedChars}
                    onChange={sanitizeInput}
                    placeholder="NAME@SYSTEM.COM"
                    className="w-full border-b-2 border-zinc-100 py-3 md:py-4 outline-none focus:border-black transition-all text-[13px] font-black italic placeholder:text-zinc-200 placeholder:italic uppercase tracking-widest"
                  />
               </div>

               <div className="space-y-2 group relative">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 group-focus-within:text-black transition-colors italic">Access Key</label>
                  <input 
                    type={showPassword ? "text" : "password"}
                    onKeyDown={blockRestrictedChars}
                    onChange={sanitizeInput}
                    placeholder="••••••••"
                    className="w-full border-b-2 border-zinc-100 py-3 md:py-4 outline-none focus:border-black transition-all text-[13px] font-black italic placeholder:text-zinc-200 transition-all uppercase tracking-[0.5em]"
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
                  <button className="w-full bg-black text-white py-6 flex items-center justify-center gap-5 group overflow-hidden relative active:scale-[0.98] transition-transform shadow-xl">
                     <span className="text-[12px] font-black uppercase tracking-[0.3em] italic relative z-10 group-hover:-translate-y-12 transition-transform duration-500">Initialize Account</span>
                     <span className="text-[12px] font-black uppercase tracking-[0.3em] italic absolute translate-y-12 group-hover:translate-y-0 transition-transform duration-500">Creating Node...</span>
                     <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </button>

                  <div className="flex items-center gap-6">
                     <span className="text-zinc-300 text-[9px] font-black uppercase tracking-widest">Protocol 01</span>
                     <Link href="/login" className="text-[11px] font-black uppercase italic tracking-widest border-b-2 border-black pb-1 hover:opacity-50 transition-all">
                        Already Registered? Sign In
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
