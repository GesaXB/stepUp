"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-center space-y-12"
      >
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
              <AlertCircle size={40} />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Authentication <br /> <span className="text-zinc-300">Failure.</span></h1>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
              We couldn&apos;t complete your sign-in request. The authorization code might be invalid or expired.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link 
            href="/login"
            className="w-full bg-black text-white py-6 flex items-center justify-center gap-5 group overflow-hidden relative active:scale-[0.98] transition-transform shadow-xl"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform duration-500" />
            <span className="text-[12px] font-black uppercase tracking-[0.3em] italic">Back to Login</span>
          </Link>
          <Link 
            href="/"
            className="block text-[10px] font-black uppercase tracking-widest italic text-zinc-300 hover:text-black transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
