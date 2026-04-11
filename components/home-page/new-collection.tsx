"use client";

import Image from "next/image";
import MotionViewport from "@/components/ui/motion-viewport";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/product-card";

const collection = [
  {
    name: "Air Max SU '26 Platinum",
    description: "High-performance urban running sneaker with adaptive cushioning.",
    image: "/images/sneaker-yellow.png",
    price: "$240",
    index: "01",
    sku: "SU-V1-AMX",
    status: "In Stock",
    type: "Core"
  },
  {
    name: "Leather Heritage Classic",
    description: "Hand-finished premium leather sneakers for a timeless streetwear look.",
    image: "/images/story-sneaker.png",
    price: "$190",
    index: "02",
    sku: "SU-V1-LHC",
    status: "Limited",
    type: "Heritage"
  },
  {
    name: "Tech Performance Onyx",
    description: "Futuristic silhouette with high-tensile mesh for daily durability.",
    image: "/images/sneaker-right.png",
    price: "$280",
    index: "03",
    sku: "SU-V1-TPO",
    status: "Low Stock",
    type: "Performance"
  },
];

export default function NewCollection() {
  return (
    <section className="relative py-20 md:py-32 px-6 md:px-24 max-w-[1400px] mx-auto overflow-hidden bg-white border-t border-black/10">
      
      {/* Structural Tech Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      {/* SEO Watermark */}
      <div className="absolute top-32 md:top-40 left-0 w-full whitespace-nowrap opacity-[0.03] select-none pointer-events-none">
        <span className="text-[100px] md:text-[260px] font-black uppercase tracking-tighter italic">SYS.CATALOG / 2026</span>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-32 gap-12 border-b border-black/10 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4 opacity-40">
             <span className="text-[10px] font-black">03</span>
             <div className="w-12 h-px bg-black" />
             <span className="text-[10px] font-black uppercase tracking-widest italic">Global Inventory</span>
          </div>
          <MotionViewport direction="right">
            <h2 className="text-[45px] md:text-[110px] font-black italic leading-[0.8] tracking-tighter uppercase text-black max-w-4xl">
              <span className="block">Technical</span>
              <span className="block text-zinc-300">Footwear</span>
            </h2>
            <p className="mt-8 text-black font-bold max-w-xl text-[12px] md:text-[14px] leading-relaxed uppercase tracking-widest italic border-l-2 border-black pl-6">
              Explore our most exclusive luxury streetwear drops. Engineered for absolute precision, structural integrity, and urban movement.
            </p>
          </MotionViewport>
        </div>
        
        <MotionViewport direction="left">
           <button className="flex items-center justify-between gap-6 px-8 py-5 border border-black hover:bg-black hover:text-white transition-colors duration-500 group bg-white">
              <span className="text-[12px] font-black uppercase tracking-[0.2em] italic">Open Catalog</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
           </button>
        </MotionViewport>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
        {collection.map((item, idx) => (
          <MotionViewport key={item.sku} delay={idx * 0.1} distance={50}>
             <ProductCard item={item} />
          </MotionViewport>
        ))}
      </div>
    </section>
  );
}
