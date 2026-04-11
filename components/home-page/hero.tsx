"use client";

import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1, 
      ease: [0.16, 1, 0.3, 1]
    } 
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1,
    x: 0,
    transition: { duration: 0.1, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: { duration: 0.1, ease: "easeIn" }
  }
};

const sentenceVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    }
  },
  exit: {
     opacity: 0,
     transition: {
       staggerChildren: 0.02,
       staggerDirection: -1
     }
  }
};

const PHRASES = [
  { top: "Step", bottom: "Up" },
  { top: "Born", bottom: "Move" },
  { top: "Pure", bottom: "Style" },
  { top: "Urban", bottom: "Flow" }
];

const TypingText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <motion.span 
      variants={sentenceVariants} 
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={letterVariants} className="inline-block translate-x-[0.08em]">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 md:px-24 max-w-[1300px] mx-auto bg-white overflow-hidden"
    >
      {/* Background Ornament: Technical Grid */}
      <div className="absolute inset-0 -z-20 opacity-[0.02] pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, 
             backgroundSize: '40px 40px' 
           }} 
      />
      
      {/* Top Header Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-16 md:mb-24 relative z-10">
        {/* Left: Headline */}
        <div className="col-span-1 md:col-span-7 relative min-h-[160px] md:min-h-[420px]">
          <div className="flex gap-4 items-center mb-6 md:mb-10 opacity-30 mt-4 md:mt-0">
             <span className="text-[10px] font-black">01</span>
             <div className="w-10 h-px bg-black" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Series Concept V1</span>
          </div>

          <div className="relative h-full overflow-visible">
            <AnimatePresence mode="wait">
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-start"
              >
                <h1 className="text-[22vw] md:text-[9vw] font-black italic leading-[0.8] tracking-tighter uppercase text-black overflow-visible bg-white md:pr-8">
                  <TypingText text={PHRASES[index].top} className="block mb-2" />
                  <TypingText text={PHRASES[index].bottom} className="block" />
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <motion.div variants={itemVariants} className="hidden md:flex absolute bottom-0 gap-10 items-center opacity-30">
             <div className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 bg-black rounded-full" />
                <span className="text-[11px] font-black uppercase tracking-widest italic">Authenticity</span>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-black" />
                <span className="text-[11px] font-black uppercase tracking-widest italic">Release &apos;26</span>
             </div>
          </motion.div>
        </div>

        {/* Right: Description & Editorial Elements */}
        <div className="col-span-1 md:col-span-5 md:pl-16 pt-12 md:pt-16 flex flex-col gap-10 h-full relative">
           {/* Editorial Badge */}
           <motion.div variants={itemVariants} className="flex flex-col gap-3 group">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center text-[10px] font-black rotate-[-15deg] group-hover:rotate-0 transition-transform">
                    AF/26
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-300">Spec / Technical</p>
                    <p className="text-[10px] font-black uppercase italic">High-Tensile Mesh</p>
                 </div>
              </div>
              <div className="w-full h-px bg-zinc-100 origin-left scale-x-75 group-hover:scale-x-100 transition-transform" />
           </motion.div>

           {/* Global Release Ready Status */}
           <motion.div variants={itemVariants} className="flex justify-between items-end border-l-2 border-black pl-6 py-2">
              <div className="space-y-1">
                 <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-200">New York • Tokyo • London</p>
                 <p className="text-[10px] font-bold italic text-black uppercase">Global Release Ready</p>
              </div>
              <div className="flex gap-1 items-center">
                 <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                 <span className="text-[8px] font-black uppercase tracking-widest">LIVE</span>
              </div>
           </motion.div>

           {/* Original Bio Part */}
           <div className="space-y-8 mt-4">
              <motion.div variants={itemVariants} className="flex gap-2">
                 {[0, 1, 2].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i===0 ? 'bg-black shadow-lg shadow-black/20' : 'bg-zinc-100'}`} />)}
              </motion.div>
              <motion.p variants={itemVariants} className="text-[16px] leading-[1.6] text-zinc-500 font-bold uppercase tracking-tight italic max-w-xs transition-all hover:text-black">
                Movement is art. Precision engineering meets high-end urban aesthetics. Designed for the bold icon.
              </motion.p>
              <motion.button 
                variants={itemVariants}
                className="w-fit bg-black text-white px-12 py-5 text-[14px] font-black hover:bg-zinc-800 transition-all uppercase tracking-[0.2em] shadow-2xl italic group"
              >
                Shop Series <span className="inline-block group-hover:translate-x-2 transition-transform ml-2">→</span>
              </motion.button>
           </div>
        </div>
      </div>

      {/* Hero Image Layout (Balanced Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end relative z-10">
        {/* Left Aspect with New Ornament */}
        <motion.div variants={itemVariants} className="flex flex-col self-stretch pb-10">
            {/* Complex Technical Connector Matrix */}
            <div className="hidden md:flex flex-1 w-full relative pt-4 pb-12 opacity-60">
               {/* Left Blueprint Lines */}
               <div className="flex gap-4 h-full">
                  <motion.div 
                     initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                     className="w-[2px] h-full bg-black min-h-[140px] origin-top" 
                  />
                  <motion.div 
                     initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                     className="w-px h-3/4 bg-black/20 mt-auto origin-bottom" 
                  />
               </div>

               {/* Central Technical Specs */}
               <div className="ml-8 flex flex-col justify-start h-full pt-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] italic text-black" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                     SERIES CONCEPT // 01
                  </span>
                  
                  {/* Decorative Barcode Lines */}
                  <div className="flex flex-col gap-1.5 mt-8 opacity-40">
                     <div className="w-8 h-[1px] bg-black" />
                     <div className="w-3 h-[1px] bg-black" />
                     <div className="w-6 h-[1px] bg-black" />
                     <div className="w-12 h-[1px] bg-black" />
                  </div>
               </div>

               {/* Right Coordinate Data Panel */}
               <div className="absolute top-10 right-0 flex flex-col items-end gap-2 text-right">
                  <p className="text-[8px] font-black uppercase tracking-[0.5em]">SYS.REQ: ACTIVE</p>
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-500">LAT: 40.7128° N</p>
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-500">LON: 74.0060° W</p>
                  
                  {/* Interactive Target Reticle */}
                  <div className="mt-4 flex items-center justify-center w-10 h-10 border border-black/30 rounded-full relative animate-[spin_12s_linear_infinite] group-hover:border-black transition-colors">
                     <div className="absolute top-0 bottom-0 w-[1px] bg-black/30" />
                     <div className="absolute left-0 right-0 h-[1px] bg-black/30" />
                     <div className="w-2 h-2 bg-black rounded-full" />
                  </div>
               </div>
            </div>

            {/* Bottom Content Group */}
            <div className="flex flex-col gap-6 mt-auto">
               {/* Technical ornament above the left image */}
               <div className="flex justify-between items-end opacity-20 group">
                  <div className="space-y-1">
                     <p className="text-[8px] font-black uppercase tracking-[0.3em] group-hover:text-black transition-colors">Composition / Material</p>
                     <p className="text-[7px] font-bold uppercase tracking-[0.2em]">Resistant Polymer 0.44</p>
                  </div>
                  <div className="w-12 h-px bg-black origin-right transition-transform group-hover:scale-x-150" />
               </div>

               <div className="aspect-4/3 overflow-hidden bg-zinc-50 border border-zinc-100 group relative">
                  <Image src="/images/hero-main.png" alt="Lifestyle" width={400} height={300} className="w-full h-full object-cover scale-150 group-hover:scale-[1.65] transition-transform duration-1000 object-bottom" />
                  <div className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest bg-white/90 backdrop-blur-sm px-2 py-1">Tech Core</div>
               </div>
               
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest italic text-zinc-300">
                  <span>Gallery 01</span>
                  <span>028 / 500</span>
               </div>
            </div>
        </motion.div>

        <motion.div variants={itemVariants}>
            <div className="aspect-3/4 overflow-hidden bg-zinc-50 shadow-2xl border-4 border-white group relative">
               <Image src="/images/hero-main.png" alt="Model" width={600} height={800} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" priority />
               <div className="absolute inset-0 border border-black/5 pointer-events-none" />
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-10 pb-6">
            <div className="group relative">
               <Image src="/images/sneaker-right.png" alt="Sneaker" width={400} height={300} className="w-full h-auto group-hover:-translate-y-4 group-hover:rotate-6 transition-transform duration-700" />
            </div>
            <div className="space-y-4 p-6 bg-zinc-50 border border-zinc-100 hover:bg-black group/card transition-colors cursor-pointer">
               <div className="flex justify-between items-end">
                  <h4 className="text-[20px] font-black uppercase italic tracking-tighter text-black group-hover/card:text-white transition-colors">SU - V1 Core</h4>
                  <span className="text-[9px] font-black bg-black text-white px-3 py-1 italic uppercase tracking-widest group-hover/card:bg-white group-hover/card:text-black transition-colors">Limited</span>
               </div>
               <div className="h-px w-full bg-zinc-200 group-hover/card:bg-white/20 transition-colors" />
               <p className="text-[10px] font-bold text-zinc-400 group-hover:card:text-zinc-500 uppercase tracking-widest italic transition-colors">Technical Mesh / Grey Edition</p>
            </div>
        </motion.div>
      </div>

      {/* Marquee Background */}
      <div className="absolute -bottom-10 left-0 w-full overflow-hidden opacity-[0.02] pointer-events-none select-none">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 text-[100px] font-black uppercase italic tracking-tighter whitespace-nowrap text-black"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>Premium • Authentic • Streetwear • Series SU-V1 • Modern Heritage • </span>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
