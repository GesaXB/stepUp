"use client";

import Image from "next/image";
import MotionViewport from "@/components/ui/motion-viewport";
import { motion } from "framer-motion";

export default function Story() {
  return (
    <section className="relative py-20 md:py-32 px-6 md:px-24 max-w-[1400px] mx-auto text-center border-t border-zinc-100 bg-white overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-24 md:top-20 left-1/2 -translate-x-1/2 w-full whitespace-nowrap opacity-[0.03] select-none pointer-events-none">
        <span className="text-[120px] md:text-[320px] font-black uppercase tracking-tighter italic">OUR ETHOS / 02</span>
      </div>

      {/* Ornaments */}
      <div className="absolute top-20 md:top-32 right-6 md:right-12 text-black/10 text-3xl font-light select-none">+</div>
      <div className="absolute bottom-20 md:bottom-32 left-6 md:left-12 text-black/10 text-3xl font-light select-none rotate-45">x</div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-8 opacity-40">
           <span className="text-[10px] font-black">02</span>
           <div className="w-12 h-px bg-black" />
           <span className="text-[10px] font-black uppercase tracking-widest italic">The Mission</span>
        </div>

        <MotionViewport>
          <h2 className="text-[55px] md:text-[145px] font-black italic leading-[0.75] tracking-tighter uppercase text-black mb-12">
            <div className="overflow-hidden py-4">
              <span className="block">Our Story</span>
            </div>
          </h2>
        </MotionViewport>
        
        <MotionViewport delay={0.2}>
          <p className="max-w-2xl mx-auto text-[16px] md:text-[18px] leading-[1.8] text-zinc-500 font-bold mb-20 md:mb-32 tracking-tight px-4 md:px-0">
            StepUP started with a simple idea — great shoes should look good and feel even better. We focus on delivering high-quality sneakers that match your unique lifestyle.
          </p>
        </MotionViewport>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-24 text-left">
        {/* Left Side */}
        <div className="w-full md:w-[450px] space-y-12 md:space-y-16">
          <MotionViewport direction="right">
            <div className="relative">
              <div className="w-full max-w-[320px] aspect-square bg-[#f9f9f9] p-6 group mx-auto md:mx-0 border border-zinc-50 transition-colors duration-700 hover:bg-zinc-100">
                <Image 
                  src="/images/story-sneaker.png" 
                  alt="Story Sneaker" 
                  width={320} 
                  height={320} 
                  className="w-full h-auto group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-1000 ease-out"
                />
              </div>
              {/* Image floating label */}
              <div className="absolute -bottom-6 right-4 md:-right-6 bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hidden md:block">
                Concept Edge
              </div>
            </div>
          </MotionViewport>
          
          <div className="space-y-10">
            <MotionViewport direction="right" delay={0.1}>
              <div className="flex gap-6">
                 <div className="w-px h-16 bg-zinc-200" />
                 <p className="text-[16px] leading-relaxed text-zinc-500 font-bold max-w-[320px] italic">
                   We&apos;re passionate about movement. StepUP offers clean, modern footwear designed to keep you comfortable through the city jungle.
                 </p>
              </div>
            </MotionViewport>
            
            <MotionViewport direction="right" delay={0.2}>
              <button className="group relative overflow-hidden px-14 py-6 border-2 border-black rounded-full text-[14px] font-black uppercase tracking-[0.2em] text-black active:scale-95 transition-transform">
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">More Information</span>
                <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </MotionViewport>
          </div>
        </div>

        {/* Right Side: Main Story Image */}
        <div className="flex-1 w-full relative">
          <MotionViewport direction="left">
            <div className="aspect-[4/5] overflow-hidden shadow-2xl bg-zinc-50 border-8 border-white ring-1 ring-zinc-100 group">
              <Image 
                src="/images/story-model.png" 
                alt="Story Model" 
                width={700} 
                height={875} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out"
              />
            </div>
          </MotionViewport>
          
          {/* Ornamental vertical text */}
          <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex flex-col items-center gap-12 opacity-20 hidden xl:flex">
             <span className="text-[10px] font-black uppercase tracking-[0.6em] rotate-90 whitespace-nowrap">Authentic Soul</span>
             <div className="w-px h-32 bg-black" />
          </div>
        </div>
      </div>
    </section>
  );
}
