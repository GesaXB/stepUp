"use client";

import Image from "next/image";
import MotionViewport from "@/components/ui/motion-viewport";
import { ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";

const collection = [
  {
    name: "Air Max SU '26 Platinum",
    description: "High-performance urban running sneaker with adaptive cushioning.",
    image: "/images/sneaker-yellow.png",
    price: "$240.00",
    index: "01",
    rating: 4.8,
  },
  {
    name: "Leather Heritage Classic",
    description: "Hand-finished premium leather sneakers for a timeless streetwear look.",
    image: "/images/story-sneaker.png",
    price: "$190.00",
    index: "02",
    rating: 4.9,
  },
  {
    name: "Tech Performance Onyx",
    description: "Futuristic silhouette with high-tensile mesh for daily durability.",
    image: "/images/sneaker-right.png",
    price: "$280.00",
    index: "03",
    rating: 5.0,
  },
];

export default function NewCollection() {
  return (
    <section className="relative py-20 md:py-32 px-6 md:px-24 max-w-[1400px] mx-auto overflow-hidden bg-white border-t border-zinc-100">
      {/* SEO Watermark */}
      <div className="absolute top-32 md:top-40 left-0 w-full whitespace-nowrap opacity-[0.02] select-none pointer-events-none">
        <span className="text-[100px] md:text-[260px] font-black uppercase tracking-tighter italic">EXCLUSIVE STREETWEAR / 2026</span>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-32 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4 opacity-40">
             <span className="text-[10px] font-black">03</span>
             <div className="w-12 h-px bg-black" />
             <span className="text-[10px] font-black uppercase tracking-widest italic">Latest Arrivals</span>
          </div>
          <MotionViewport direction="right">
            <h2 className="text-[45px] md:text-[130px] font-black italic leading-[0.8] tracking-tighter uppercase text-black max-w-4xl">
              <div className="overflow-hidden py-4">
                <span className="block">Modern Urban</span>
              </div>
              <div className="overflow-hidden py-4">
                <span className="block text-zinc-100">Sneakers</span>
              </div>
            </h2>
            <p className="mt-6 md:mt-8 text-zinc-400 font-bold max-w-lg text-[14px] md:text-[16px] leading-relaxed italic">
              Explore our most exclusive luxury streetwear drops and performance footwear, engineered for those who move the city.
            </p>
          </MotionViewport>
        </div>
        
        <MotionViewport direction="left">
          <button className="group relative overflow-hidden px-14 py-6 border-2 border-black rounded-full text-[14px] font-black uppercase tracking-[0.2em] text-black active:scale-95 transition-transform mb-4">
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Shop Collection</span>
            <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </button>
        </MotionViewport>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
        {collection.map((item, idx) => (
          <MotionViewport key={idx} delay={idx * 0.1} distance={50}>
            <div className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] bg-[#fafafa] flex items-center justify-center p-12 transition-all duration-700 group-hover:bg-[#f2f2f2] overflow-hidden rounded-sm">
                <Image 
                  src={item.image} 
                  alt={`${item.name} - ${item.description}`} 
                  width={400} 
                  height={500} 
                  className="w-full h-auto object-contain mix-blend-multiply group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-1000 ease-out"
                />
                
                {/* Floating Meta Details */}
                <div className="absolute top-6 left-6 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                   <span className="text-[10px] font-black uppercase tracking-widest text-black italic">Ref / {item.index}</span>
                </div>
                
                <div className="absolute top-6 right-6 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                   <Star size={10} fill="black" strokeWidth={0} />
                   <span className="text-[10px] font-black text-black">{item.rating}</span>
                </div>

                {/* Quick Add Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                   <button className="w-full bg-black text-white py-5 text-[12px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-zinc-800 transition-colors shadow-2xl">
                     Add to Bag
                     <ShoppingBag size={16} />
                   </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-10 space-y-4">
                <div className="flex justify-between items-start">
                   <h3 className="text-[20px] font-black uppercase italic leading-none text-black tracking-tighter max-w-[70%]">
                     {item.name}
                   </h3>
                   <span className="text-[18px] font-black italic text-black leading-none">{item.price}</span>
                </div>
                
                <div className="flex justify-between items-center pr-2">
                  <p className="text-[12px] text-zinc-400 font-bold uppercase tracking-widest italic line-clamp-1 max-w-[80%]">
                    {item.description}
                  </p>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-black transition-colors duration-500" />
                </div>
              </div>
              
              {/* Bottom Decoration line */}
              <div className="mt-8 w-full h-[1px] bg-zinc-100 group-hover:bg-black transition-colors duration-700" />
            </div>
          </MotionViewport>
        ))}
      </div>
    </section>
  );
}
