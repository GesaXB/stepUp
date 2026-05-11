"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function StoriesFooter() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center p-8 md:p-16 border-t border-zinc-100 bg-white relative overflow-hidden">
      {/* Editorial Watermark */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-black/10 to-transparent" />
      
      <div className="max-w-[1200px] mx-auto text-center space-y-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-[10px] font-black uppercase tracking-[1em] text-zinc-300 italic">EndOfTransmission</p>
          <h3 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter text-zinc-100 select-none leading-none">
            Digital <br /> Archive.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center w-full max-w-4xl mx-auto border-y border-zinc-50 py-16">
           <div className="space-y-2 text-center md:text-left">
              <p className="text-[9px] font-black uppercase text-zinc-300">Section I</p>
              <Link href="/journal" className="text-[11px] font-black uppercase tracking-[0.3em] italic hover:text-black text-zinc-400 transition-colors">StepUP Journal</Link>
           </div>
           <div className="space-y-2 text-center">
              <p className="text-[9px] font-black uppercase text-zinc-300">Section II</p>
              <Link href="/products" className="text-[11px] font-black uppercase tracking-[0.3em] italic hover:text-black text-zinc-400 transition-colors">The Collection</Link>
           </div>
           <div className="space-y-2 text-center md:text-right">
              <p className="text-[9px] font-black uppercase text-zinc-300">Section III</p>
              <Link href="/collabs" className="text-[11px] font-black uppercase tracking-[0.3em] italic hover:text-black text-zinc-400 transition-colors">Collaborations</Link>
           </div>
        </div>

        <div className="flex flex-col items-center gap-8">
           <div className="w-12 h-px bg-black opacity-10" />
           <div className="space-y-2">
              <p className="text-[8px] font-black uppercase tracking-widest text-zinc-300">All Visual Data Encrypted // 2026 Edition</p>
              <p className="text-[8px] font-bold text-zinc-200">STEPUP MOTORSPORT & LIFESTYLE DIVISION</p>
           </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-20 -left-20 text-[200px] font-black italic text-zinc-50 pointer-events-none select-none tracking-tighter">
        EXIT
      </div>
    </section>
  );
}
