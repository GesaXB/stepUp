"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Zap, Target, Layers, Globe } from "lucide-react";

export function StoriesGrid() {
  return (
    <section className="py-20 md:py-40 px-6 md:px-12 lg:px-16 space-y-80 relative max-w-[1300px] mx-auto overflow-visible z-10">
      
      {/* Background Ornament: Pushed deeper into z-space and further right */}
      <div className="absolute top-0 right-[-200px] opacity-[0.02] pointer-events-none select-none hidden xl:block -z-10">
        <span className="text-[350px] font-black italic text-black rotate-90 leading-none whitespace-nowrap">STEPUP-26</span>
      </div>

      {/* Story Item 01 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="lg:col-span-7 aspect-4/5 md:aspect-video bg-zinc-50 relative group overflow-hidden border border-black/5 shadow-2xl"
        >
          {/* Metadata Overlay */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-1">
             <span className="text-[10px] font-black italic bg-black text-white px-3 py-1 uppercase tracking-widest">Protocol Node 01</span>
             <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest bg-white/80 backdrop-blur-md px-3">Shutter: 1/8000s</span>
          </div>

          <Image
            src="/images/shoes-1.png"
            alt="Velocity Story"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] scale-110 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-10"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 opacity-10">
               <span className="text-[11px] font-black italic uppercase">001 // VELOCITY</span>
               <div className="flex-1 h-[0.5px] bg-black" />
            </div>
            <h2 className="text-6xl md:text-7xl xl:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-black">Velocity <br /> Protocol.</h2>
            <div className="flex gap-3">
               {["Carbon", "Mesh", "Light"].map(tag => (
                 <span key={tag} className="text-[8px] font-black border border-black/10 px-3 py-1 uppercase tracking-widest text-zinc-400">{tag}</span>
               ))}
            </div>
          </div>

          <p className="text-zinc-500 text-[14px] leading-relaxed font-bold uppercase tracking-tight italic">
            Movement is life. A 24-hour study on the durability of the SU-V1 chassis in high-density urban sectors.
          </p>

          <div className="pt-6 space-y-8">
             <div className="grid grid-cols-2 gap-8 border-t border-zinc-100 pt-8">
                <div className="space-y-1">
                   <p className="text-[9px] font-black uppercase text-zinc-300 tracking-widest">Locale</p>
                   <p className="text-[10px] font-black italic uppercase">Tokyo - Shibuya</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] font-black uppercase text-zinc-300 tracking-widest">Model</p>
                   <p className="text-[10px] font-black italic uppercase">SU-V1 CORE</p>
                </div>
             </div>

             <Link href="#" className="inline-flex items-center gap-6 border-b-2 border-black pb-2 text-[12px] font-black uppercase tracking-[0.4em] italic hover:opacity-50 transition-all group">
                Access Dossier <ArrowUpRight size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
             </Link>
          </div>
        </motion.div>
      </div>

      {/* Story Item 02: Reversed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="lg:col-span-5 lg:order-1 order-2 space-y-10 lg:text-right flex flex-col items-start lg:items-end"
        >
          <div className="space-y-6 w-full flex flex-col items-start lg:items-end">
            <div className="flex items-center gap-4 opacity-10 w-full">
               <div className="flex-1 h-[0.5px] bg-black" />
               <span className="text-[11px] font-black italic uppercase">002 // ARCHIVE</span>
            </div>
            <h2 className="text-6xl md:text-7xl xl:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-black">Archival <br /> <span className="text-zinc-200">Rebirth.</span></h2>
          </div>

          <p className="text-zinc-500 text-[14px] leading-relaxed font-bold uppercase tracking-tight italic max-w-sm">
            Deep-diving into the 1994 vaults to extract blueprints that redefined street aesthetics.
          </p>

          <div className="pt-6 space-y-8 w-full">
             <div className="grid grid-cols-2 gap-8 border-t border-zinc-100 pt-8 lg:justify-items-end">
                <div className="space-y-1 lg:text-right">
                   <p className="text-[9px] font-black uppercase text-zinc-300 tracking-widest">Era</p>
                   <p className="text-[10px] font-black italic uppercase">Mid-90s Analog</p>
                </div>
                <div className="space-y-1 lg:text-right">
                   <p className="text-[9px] font-black uppercase text-zinc-300 tracking-widest">State</p>
                   <p className="text-[10px] font-black italic uppercase">Restored</p>
                </div>
             </div>

             <div className="flex lg:justify-end py-4">
                <Link href="#" className="inline-flex items-center gap-6 border-b-2 border-black pb-2 text-[12px] font-black uppercase tracking-[0.4em] italic hover:opacity-50 transition-all group">
                   Open Archives <ArrowUpRight size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                </Link>
             </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="lg:col-span-7 lg:order-2 order-1 aspect-4/5 md:aspect-video bg-zinc-50 relative group overflow-hidden border border-black/5 shadow-2xl"
        >
          <div className="absolute top-6 right-6 z-10 flex flex-col gap-1 items-end">
             <span className="text-[10px] font-black italic bg-zinc-200 text-black px-3 py-1 uppercase tracking-widest">Fragment Node 02</span>
          </div>

          <Image
            src="/images/shoes-2.png"
            alt="Archive Story"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] scale-100 group-hover:scale-105"
          />
        </motion.div>
      </div>

      {/* Narrative Progress Side Panel */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-6 opacity-30 z-50">
         {[1, 2, 3].map(i => (
           <div key={i} className="flex flex-col items-center gap-3">
              <span className="text-[9px] font-black">{i}</span>
              <div className="w-px h-16 bg-black" />
           </div>
         ))}
      </div>
    </section>
  );
}
