"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/navbar";

export default function LoginPage() {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Navbar />
      
      <main className="flex-1 flex flex-col md:flex-row pt-[100px]">
        {/* Left: Editorial Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block w-1/2 relative overflow-hidden"
        >
          <Image 
            src="/images/hero-main.png" 
            alt="Login Editorial" 
            fill 
            className="object-cover scale-110 hover:scale-100 transition-transform duration-[3s] object-top"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-12 left-12 text-white z-10 space-y-2">
             <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60 italic">Editorial Series</p>
             <h2 className="text-4xl font-black uppercase italic tracking-tighter">Step into <br /> your world.</h2>
          </div>
        </motion.div>

        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white relative h-full overflow-y-auto">
          {/* Background Grid Ornament */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full max-w-sm relative z-10 pb-16 md:pb-0"
          >
            <div className="mb-12 space-y-4">
               <div className="flex items-center gap-4 opacity-30 mb-6">
                  <span className="text-[10px] font-black">LOGIN_V.01</span>
                  <div className="w-12 h-px bg-black" />
               </div>
               <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                  Welcome <br /> <span className="text-zinc-200">Back</span>
               </h1>
            </div>

            <form className="space-y-8 group" onSubmit={(e) => e.preventDefault()}>
               <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full border-b border-zinc-100 py-3 outline-none focus:border-black transition-colors text-[14px] font-bold italic placeholder:text-zinc-100"
                  />
               </div>

               <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Password</label>
                    <Link href="#" className="text-[10px] font-black uppercase text-zinc-300 hover:text-black transition-colors">Forgot?</Link>
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full border-b border-zinc-100 py-3 outline-none focus:border-black transition-colors text-[14px] font-bold italic placeholder:text-zinc-100"
                  />
               </div>

               <div className="pt-4 space-y-6">
                  <button className="w-full bg-black text-white py-5 flex items-center justify-center gap-4 group/btn overflow-hidden relative">
                     <span className="text-[12px] font-black uppercase tracking-[0.2em] italic relative z-10 group-hover/btn:-translate-y-12 transition-transform duration-500">Sign In</span>
                     <span className="text-[12px] font-black uppercase tracking-[0.2em] italic absolute translate-y-12 group-hover/btn:translate-y-0 transition-transform duration-500">Let&apos;s Go</span>
                     <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>

                  <div className="flex items-center gap-6 pt-2">
                     <span className="text-zinc-200 text-[9px] font-black uppercase tracking-widest">or</span>
                     <Link href="/register" className="text-[11px] font-black uppercase italic tracking-widest border-b border-black pb-1 hover:opacity-50 transition-all">
                        Create Account
                     </Link>
                  </div>
               </div>
            </form>
          </motion.div>

          {/* Bottom Decoration (Absolutely positioned to avoid adding height) */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center opacity-[0.15] select-none pointer-events-none hidden md:flex">
             <span className="text-[9px] font-black uppercase tracking-[0.5em]">Global / Auth</span>
             <span className="text-[9px] font-black italic uppercase">StepUP © 2026</span>
          </div>
        </div>
      </main>
    </div>
  );
}
