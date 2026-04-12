"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import MotionViewport from "@/components/ui/motion-viewport";
import { Clock, ArrowRight } from "lucide-react";

export default function NewDropsPage() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 });

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) h = 0;
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const newDrops = PRODUCTS.filter(p => p.isNewDrop);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white flex flex-col overflow-x-hidden text-black font-sans relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
      <main className="flex-1 pt-[120px] md:pt-[150px] relative z-10">
        
        {/* Minimal Hero Header */}
        <section className="px-6 md:px-24 max-w-[1300px] mx-auto pb-16 md:pb-24">
           <MotionViewport className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-black/10 pb-16">
              
              <div className="space-y-6">
                 <div className="flex items-center gap-4 opacity-40">
                    <span className="w-12 h-px bg-black" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">022. Drops</span>
                 </div>
                 
                 <h1 className="text-6xl sm:text-[90px] lg:text-[130px] font-black uppercase italic tracking-tighter leading-[0.8] text-black">
                    Next <br />
                    <span className="text-zinc-300">Release.</span>
                 </h1>
              </div>

              {/* Clean Minimal Countdown */}
              <div className="flex flex-col gap-6 md:min-w-[400px]">
                 <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Time Until Deployment</span>
                 </div>
                 
                 <div className="flex items-end gap-6 text-5xl md:text-7xl font-black italic tracking-tighter text-black w-full border-b border-black/5 pb-4">
                    <div className="flex items-baseline gap-2">
                       <span>{String(timeLeft.h).padStart(2, '0')}</span>
                       <span className="text-[12px] uppercase tracking-widest text-zinc-300">h</span>
                    </div>
                    <span className="text-zinc-200 mx-1">:</span>
                    <div className="flex items-baseline gap-2">
                       <span>{String(timeLeft.m).padStart(2, '0')}</span>
                       <span className="text-[12px] uppercase tracking-widest text-zinc-300">m</span>
                    </div>
                    <span className="text-zinc-200 mx-1">:</span>
                    <div className="flex items-baseline gap-2">
                       <span className="text-zinc-800">{String(timeLeft.s).padStart(2, '0')}</span>
                       <span className="text-[12px] uppercase tracking-widest text-zinc-300">s</span>
                    </div>
                 </div>
              </div>
           </MotionViewport>
        </section>

        {/* Clean, Smooth Vertical Showcase */}
        <section className="max-w-[1300px] mx-auto py-24 flex flex-col gap-32 md:gap-48 px-6 md:px-24">
           {newDrops.map((item, index) => (
              <MotionViewport 
                key={item.sku}
                className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 justify-between items-center`}
              >
                 
                 {/* Ultra-minimal Image Block */}
                 <div className="w-full lg:w-[46%] aspect-square md:aspect-[4/5] bg-zinc-50 relative group overflow-hidden">
                    <Link href={`/products/${item.sku}`} className="absolute inset-0 flex items-center justify-center p-12 lg:p-24">
                       {/* Soft Blur Shadow */}
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/50 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                       
                       <Image 
                         src={item.image} 
                         alt={item.name} 
                         fill 
                         className="object-contain p-12 lg:p-20 scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out brightness-95 group-hover:brightness-100 drop-shadow-xl relative z-10" 
                       />
                    </Link>
                 </div>

                 {/* Refined Minimalist Text */}
                 <div className="w-full lg:w-[46%] flex flex-col gap-10">
                    <div className="space-y-6">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">
                          0{index + 1} / {item.type}
                       </span>
                       
                       <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-black leading-[0.85]">
                          {item.name}
                       </h2>
                       
                       <p className="text-zinc-500 font-bold uppercase tracking-widest italic text-[11px] leading-relaxed max-w-sm">
                          {item.description}
                       </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-black/5">
                       <div className="flex flex-col gap-1">
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Expected Value</span>
                          <span className="text-lg font-black uppercase tracking-widest italic">{item.price}</span>
                       </div>
                       
                       <Link 
                         href={`/products/${item.sku}`} 
                         className="group inline-flex items-center gap-4 ml-auto"
                       >
                          <span className="text-[11px] font-black uppercase tracking-[0.3em] italic group-hover:tracking-[0.4em] transition-all">Secure Form</span>
                          <div className="w-12 h-12 bg-black flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform">
                             <ArrowRight size={16} />
                          </div>
                       </Link>
                    </div>
                 </div>
              </MotionViewport>
           ))}
        </section>

      </main>
    </div>
  );
}
