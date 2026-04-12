"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Target, Focus, ScanLine } from "lucide-react";

const PARTNERS = [
  "OFF-WHITE™", "FEAR OF GOD", "ADIDAS", "SACAI", "STÜSSY", 
  "A-COLD-WALL*", "NIKE LAB", "SUPREME", "UNDERCOVER", "AMBUSH"
];

export function CollabHero() {
  return (
    <section className="relative w-full bg-white flex flex-col overflow-hidden pt-[100px] md:pt-[120px]">
      {/* Super Subtle Background Grid - Clean & Technical */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      {/* --- CLEAN ORNAMENTS (Rame & Smooth) --- */}

      {/* Top Left Crosshair */}
      <motion.div 
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-32 left-12 hidden md:block"
      >
         <Target size={32} strokeWidth={1} />
      </motion.div>

      {/* Floating Focus Frame - Static but architectural */}
      <div className="absolute bottom-48 left-[25%] opacity-[0.03] z-0">
         <Focus size={500} strokeWidth={0.5} />
      </div>

      {/* Tiny UI Coordinates */}
      <div className="absolute top-32 right-12 hidden md:flex flex-col items-end opacity-30 text-[8px] font-black uppercase tracking-[0.4em] italic z-0 space-y-1">
         <span>LAT: 40°42'46"N</span>
         <span>LONG: 74°0'21"W</span>
         <span>SYS_SYNC: OK</span>
      </div>

      {/* Static Alliance Marker Instead of Giant Moving Text */}
      <div className="absolute top-1/3 left-10 text-[6vw] font-black italic uppercase tracking-tighter text-zinc-100 select-none pointer-events-none z-0">
        ALLIANCE ✦
      </div>
      {/* --------------------------------------- */}

      <div className="max-w-[1300px] w-full mx-auto px-6 md:px-24 flex flex-col lg:flex-row justify-between lg:items-start gap-16 relative z-10 pb-24 md:pb-32">
        
        {/* Left Typography Block */}
        <div className="w-full lg:w-7/12 space-y-12 pt-8">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="flex flex-col gap-6"
           >
              <div className="flex items-center gap-4 opacity-40">
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Archive // 2026</span>
                 <div className="w-24 h-px bg-black" />
                 <Plus size={12} />
              </div>
              
              <h1 className="text-[70px] sm:text-[100px] xl:text-[140px] font-black uppercase italic tracking-tighter leading-[0.85] text-black relative">
                 Global <br />
                 <span className="text-zinc-300">Synergy.</span>
              </h1>
           </motion.div>

           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="text-zinc-500 font-bold uppercase tracking-widest italic text-[11px] sm:text-[13px] leading-relaxed max-w-lg border-l-2 border-black/10 pl-6"
           >
             A selective archive of global partnerships. Re-engineering streetwear 
             through the lens of architectural utility and radical minimalism.
           </motion.p>
        </div>

        {/* Right Image Block - Clean Editorial Float */}
        <div className="w-full lg:w-5/12 flex justify-end relative">
           {/* Scanline Corner Ornaments */}
           <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-black/30 z-0" />
           <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-black/30 z-0" />

           <motion.div 
             initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
             animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
             transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
             className="relative aspect-[3/4] w-full max-w-[500px] bg-zinc-50 group overflow-hidden z-10 shadow-xl"
           >
              <Image 
                src="/images/hero-main.png" 
                alt="Collab Editorial" 
                fill 
                className="object-cover object-top scale-110 group-hover:scale-100 transition-transform duration-[3s] ease-out grayscale group-hover:grayscale-0"
              />
              
              {/* Minimal Text Overlay on Image */}
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
                 <div className="flex justify-between items-end mix-blend-overlay">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2">
                      <ScanLine size={14} /> Index 001
                    </span>
                    <span className="text-[10px] font-black italic uppercase">StepUP Archive</span>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>

      {/* Ultra-Clean Bottom Marquee */}
      <div className="border-t border-black/10 bg-zinc-50 py-5 overflow-hidden relative z-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex whitespace-nowrap items-center w-max"
        >
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex items-center"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center">
                {PARTNERS.map(partner => (
                  <div key={partner + i} className="flex items-center">
                    <span className="text-[11px] font-black italic uppercase tracking-[0.4em] text-black px-12 opacity-50 hover:opacity-100 transition-opacity cursor-default">
                      {partner}
                    </span>
                    <Plus size={10} className="text-zinc-300" />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
