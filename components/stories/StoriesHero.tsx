"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlayCircle, ShieldCheck, Activity } from "lucide-react";

export function StoriesHero() {
  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden bg-white">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      
      {/* Immersive Background Image */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/images/hero-main.png" 
          alt="Hero Narrative" 
          fill 
          className="object-cover grayscale" 
          priority
        />
      </motion.div>

      {/* Floating Technical Data Lines */}
      <div className="absolute top-40 left-10 md:left-24 hidden lg:block space-y-6 z-10 opacity-30">
        <div className="flex items-center gap-4">
           <Activity size={14} />
           <span className="text-[9px] font-black uppercase tracking-[0.4em] italic">System Status: Active</span>
        </div>
        <div className="w-px h-32 bg-linear-to-b from-black to-transparent ml-2" />
        <div className="space-y-1">
           <p className="text-[8px] font-bold uppercase tracking-widest">Protocol // 088-X</p>
           <p className="text-[8px] font-bold uppercase tracking-widest">Encryption: SSL/High</p>
        </div>
      </div>

      <div className="absolute bottom-40 right-10 md:right-24 hidden lg:block text-right z-10 opacity-30">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] italic mb-4">Coordinate Lock</p>
        <div className="space-y-1">
           <p className="text-[10px] font-bold">LAT: 40.7128° N</p>
           <p className="text-[10px] font-bold">LON: 74.0060° W</p>
        </div>
      </div>

      <div className="relative z-20 text-center space-y-16 px-6 max-w-[1200px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center gap-6 opacity-40">
            <div className="w-10 h-px bg-black" />
            <span className="text-[11px] font-black uppercase tracking-[0.8em] italic">StepUP Narrative Division // Vol. I</span>
            <div className="w-10 h-px bg-black" />
          </div>
          <h1 className="text-7xl md:text-[200px] font-black italic uppercase leading-[0.75] tracking-tighter text-black">
            Visual <br /> <span className="text-zinc-200">Rebirth.</span>
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-14"
        >
          <button className="flex items-center gap-8 group">
             <div className="w-24 h-24 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-700 ease-in-out shadow-2xl relative">
                <PlayCircle size={32} />
                <div className="absolute inset-0 rounded-full border border-black scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-20 transition-all duration-700" />
             </div>
             <div className="text-left space-y-1">
                <span className="text-[12px] font-black uppercase tracking-[0.4em] italic block">Play Archive Reel</span>
                <span className="text-[9px] font-bold text-zinc-300 block uppercase">Duration: 02:44m</span>
             </div>
          </button>
          
          <div className="flex items-center gap-12 opacity-20">
             <div className="flex items-center gap-3">
                <ShieldCheck size={14} />
                <span className="text-[9px] font-black uppercase italic">Secured Access</span>
             </div>
             <div className="w-px h-4 bg-black" />
             <span className="text-[9px] font-black uppercase italic">4K Cinematic Stream</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
