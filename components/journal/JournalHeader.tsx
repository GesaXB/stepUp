"use client";

import { motion } from "framer-motion";

export function JournalHeader() {
  return (
    <header className="mb-32 space-y-12 relative">
      <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[120px] md:text-[200px] font-black italic uppercase leading-none tracking-tighter">JOURNAL</span>
      </div>
      
      <div className="space-y-6 relative z-10">
        <div className="flex items-center gap-4 opacity-40">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">StepUP Journal / Vol. 01</span>
           <div className="w-12 h-px bg-black" />
        </div>
        <motion.h1 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-[140px] font-black italic uppercase leading-[0.8] tracking-tighter text-black"
        >
          Stories <br /> <span className="text-zinc-200">Beyond.</span>
        </motion.h1>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5 }}
        className="max-w-md text-[11px] font-bold uppercase tracking-widest leading-relaxed italic"
      >
        An independent publication exploring the intersection of design, technology, and culture within the archival footwear ecosystem.
      </motion.p>
    </header>
  );
}
