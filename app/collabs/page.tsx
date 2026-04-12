"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CollabHero } from "@/components/collabs/collab-hero";
import { CollabStories } from "@/components/collabs/collab-stories";
import { CollabClients } from "@/components/collabs/collab-clients";
import ProductCard from "@/components/products/product-card";
import { PRODUCTS } from "@/lib/products";
import Link from "next/link";
import MotionViewport from "@/components/ui/motion-viewport";
import { ArrowRight } from "lucide-react";

export default function CollabsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const collabs = PRODUCTS.filter(p => p.isCollab);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-white selection:bg-black selection:text-white flex flex-col pt-[85px]"
    >
      <main className="flex-1">
        
        {/* Editorial Hero */}
        <CollabHero />

        {/* The Client Network */}
        <CollabClients />

        {/* The Archive Stories */}
        <CollabStories />

        {/* Product Artifact Grid */}
        <section className="bg-white py-24 md:py-48 relative border-t border-black/5">
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
           />
           
           <div className="px-6 md:px-24 max-w-[1300px] mx-auto space-y-24 relative z-10">
              <MotionViewport className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-black/10 pb-12">
                 <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] italic opacity-40">The Output</span>
                    <h2 className="text-6xl md:text-[100px] font-black uppercase italic tracking-tighter leading-[0.8] text-black">
                       Release <br />
                       <span className="text-zinc-300">Artifacts.</span>
                    </h2>
                 </div>
                 <div className="flex flex-col items-start md:items-end gap-2 text-left md:text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest italic opacity-40">Series Archive</span>
                    <span className="text-xl font-black italic uppercase">SU-2026-V1</span>
                 </div>
              </MotionViewport>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 pt-12">
                 <AnimatePresence mode="popLayout">
                    {collabs.map((product, i) => (
                       <motion.div
                          key={product.sku}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                       >
                          <ProductCard item={product} />
                       </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           </div>
        </section>

        {/* Minimal High-End Footer CTA */}
        <section className="py-24 md:py-48 px-6 text-center border-t border-black/5 bg-zinc-50 relative overflow-hidden">
           <MotionViewport className="relative z-10 flex flex-col items-center justify-center gap-12">
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">End of Archive 01</h4>
                 <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none text-black">
                    Join The <br/> <span className="text-zinc-300">Network.</span>
                 </h2>
              </div>
              
              <Link 
                href="/register" 
                className="w-fit bg-black text-white px-12 py-5 text-[14px] font-black hover:bg-zinc-800 transition-all uppercase tracking-[0.2em] shadow-2xl italic group flex items-center justify-center relative overflow-hidden active:scale-95 mx-auto"
              >
                 <span className="relative z-10 flex items-center">
                   Access Registry
                   <span className="inline-block group-hover:translate-x-2 transition-transform ml-3">→</span>
                 </span>
                 <div className="absolute inset-0 bg-zinc-800 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </Link>
           </MotionViewport>
        </section>

      </main>
    </motion.div>
  );
}
