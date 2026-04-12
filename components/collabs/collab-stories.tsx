"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MotionViewport from "@/components/ui/motion-viewport";
import { ArrowUpRight, Barcode, ScanLine } from "lucide-react";
import { useRef } from "react";
import { OffWhiteLogo, FogLogo } from "./collab-logos";

const COLLAB_STORIES = [
  {
    client: "OFF-WHITE™",
    title: "The Deconstruction",
    image: "/images/hero-main.png",
    desc: "A raw interpretation of urban movement, bridging the gap between high-fashion silhouettes and street-ready utility.",
    year: "2026",
    code: "OW-ARCH-01",
    features: ["Zip-tie Tag", "Exposed Foam", "Helvetica Print"]
  },
  {
    client: "FEAR OF GOD",
    title: "Modern Grace",
    image: "/images/story-model.png",
    desc: "Merging desert sand palettes with architectural structure. A study in minimalist luxury and movement.",
    year: "2025",
    code: "FOG-ESS-04",
    features: ["Matte Cage", "Thick Midsole", "Earth Tones"]
  }
];

export function CollabStories() {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="py-32 md:py-48 space-y-48 relative overflow-hidden">
       {/* Background Noise / Grid */}
       <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
            style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
       />

       {COLLAB_STORIES.map((story, i) => (
         <MotionViewport 
           key={story.client} 
           className={`relative flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 justify-between items-center max-w-[1300px] mx-auto px-6 md:px-24 z-10`}
         >
            {/* Giant Background Text for Extra "Noise" - Made static for performance */}
            <MotionViewport className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-black italic tracking-tighter uppercase whitespace-nowrap pointer-events-none select-none z-0 text-zinc-50 opacity-50">
               {story.client}
            </MotionViewport>

            {/* Image Container with Ornaments */}
            <div className="w-full lg:w-[46%] relative group bg-white p-4 shadow-2xl z-10 border border-black/5">
               <div className="w-full relative aspect-square md:aspect-[4/5] overflow-hidden bg-zinc-100">
                  <motion.div className="h-full w-full relative z-10" whileHover={{ scale: 1.05 }} transition={{ duration: 1.5, ease: "easeOut" }}>
                     <Image src={story.image} alt={story.client} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]" />
                  </motion.div>

                  {/* Brand Logo Watermark Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 mix-blend-overlay pointer-events-none z-20">
                     {story.client.includes("OFF-WHITE") && <OffWhiteLogo className="w-64 h-64 text-black" />}
                     {story.client.includes("FEAR OF GOD") && <FogLogo className="w-64 h-64 text-black" />}
                  </div>
                  
                  {/* Technical Overlays */}
                  <div className="absolute top-6 left-6 flex flex-col items-start gap-2">
                     <span className="bg-black text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.3em] shadow-lg flex items-center gap-2">
                        {story.code} <ScanLine size={12} />
                     </span>
                     <span className="text-[10px] font-black uppercase text-black italic bg-white/90 backdrop-blur-md px-3 py-1.5 shadow-lg border border-black/10">
                        {story.year} // PTOTOTYPE
                     </span>
                  </div>

                  <div className="absolute bottom-6 right-6 opacity-30 mix-blend-difference text-white flex flex-col items-end">
                     <Barcode size={48} strokeWidth={1} />
                     <span className="text-[7px] font-black tracking-[0.5em] mt-1">{story.code}</span>
                  </div>
               </div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-[46%] flex flex-col gap-10 z-10">
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] bg-black text-white px-3 py-1 font-black uppercase tracking-widest italic rounded-sm">Client</span>
                     <span className="text-xl md:text-3xl font-black uppercase italic tracking-tighter text-zinc-400">{story.client}</span>
                  </div>
                  
                   <div className="space-y-2">
                     <motion.h2 
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       className="text-5xl md:text-6xl xl:text-[75px] font-black uppercase italic tracking-tighter leading-[0.85] text-black break-words"
                     >
                        {story.title}
                     </motion.h2>
                  </div>
               </div>

               <p className="text-zinc-600 font-bold uppercase tracking-tight italic text-[14px] leading-relaxed max-w-lg border-l-4 border-black/10 pl-6">
                  {story.desc}
               </p>

               {/* Design Features Links/Tags */}
               <div className="flex flex-wrap gap-3">
                  {story.features.map((feat, idx) => (
                     <span key={idx} className="px-4 py-2 border border-black/10 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-default rounded-full bg-zinc-50">
                        {feat}
                     </span>
                  ))}
               </div>

               <div className="pt-6">
                  <button className="group flex items-center gap-4 bg-transparent border-none">
                     <div className="relative w-14 h-14 bg-black flex items-center justify-center overflow-hidden rounded-full">
                        <ArrowUpRight size={24} className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 relative z-10" />
                        <div className="absolute inset-0 bg-zinc-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
                     </div>
                     <span className="text-[12px] font-black uppercase tracking-[0.2em] italic border-b-2 border-black/20 group-hover:border-black transition-all pb-1">
                        View Editorial
                     </span>
                  </button>
               </div>
            </div>
         </MotionViewport>
       ))}
    </section>
  );
}
