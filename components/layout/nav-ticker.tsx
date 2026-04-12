"use client";

import { motion } from "framer-motion";

export function NavTicker() {
  return (
    <div className="absolute top-0 left-0 right-0 z-[60] bg-black py-2 px-12 overflow-hidden whitespace-nowrap border-b border-white/10">
      <motion.div 
        animate={{ x: [0, -500] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 items-center"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="text-[9px] font-black uppercase tracking-[0.3em] text-white italic">
            Free Worldwide Shipping on all orders over $200 • New Collection SU-V1 Out Now • limited editions available • 
          </span>
        ))}
      </motion.div>
    </div>
  );
}
