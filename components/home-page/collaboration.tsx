"use client";

import Image from "next/image";
import MotionViewport from "@/components/ui/motion-viewport";

const images = [
  "/images/hero-main.png",
  "/images/story-model.png",
  "/images/hero-main.png",
  "/images/story-model.png",
];

export default function Collaboration() {
  return (
    <section className="relative w-full h-[400px] md:h-[650px] overflow-hidden bg-white border-t border-zinc-100">
      {/* Editorial Badge */}
      <div className="absolute top-12 left-12 z-20 flex items-center gap-4 opacity-70">
         <span className="text-[10px] font-black text-white">04</span>
         <div className="w-12 h-px bg-white" />
         <span className="text-[10px] font-black uppercase tracking-widest italic text-white">Collaboration</span>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 h-full w-full">
        {images.map((src, idx) => (
          <MotionViewport key={idx} direction="none" delay={idx * 0.1} distance={0} className="h-full w-full">
            <div className="relative h-full w-full grayscale contrast-125 border-r border-white/10 last:border-0 hover:grayscale-0 transition-all duration-1000 cursor-crosshair group overflow-hidden">
              <Image 
                src={src} 
                alt="Collaboration" 
                fill
                className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-[3s] ease-out"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000" />
            </div>
          </MotionViewport>
        ))}
      </div>
      
      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <MotionViewport delay={0.4}>
          <div className="relative">
            <h2 className="text-white text-[40px] md:text-[145px] font-black uppercase tracking-tighter leading-[0.8] text-center italic drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="overflow-hidden py-4">
                <span className="block">ADIDAS</span>
              </div>
              <div className="overflow-hidden py-4">
                <span className="block text-[24px] md:text-[80px] opacity-80 mt-2">COLLABORATION</span>
              </div>
            </h2>
          </div>
        </MotionViewport>
      </div>
    </section>
  );
}
