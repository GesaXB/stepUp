"use client";

import MotionViewport from "@/components/ui/motion-viewport";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-48 px-12 md:px-24 max-w-[1400px] mx-auto bg-black overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-900/30 -skew-x-12 translate-x-1/2" />
      <div className="absolute top-1/2 left-12 -translate-y-1/2 text-white/5 text-[150px] font-black italic select-none pointer-events-none">
        STEP UP
      </div>

      <div className="relative z-10 text-center space-y-16">
        <div className="flex flex-col items-center gap-6">
           <div className="flex items-center gap-4 opacity-40">
              <div className="w-12 h-px bg-white" />
              <span className="text-[10px] font-black uppercase tracking-widest italic text-white">Join the elite</span>
              <div className="w-12 h-px bg-white" />
           </div>
           
           <MotionViewport direction="up">
             <h2 className="text-[45px] md:text-[110px] font-black italic text-white uppercase leading-[0.85] tracking-tighter">
                Ready to find <br /> 
                <span className="text-zinc-800">Your Perfect</span> Pair?
             </h2>
           </MotionViewport>
        </div>

        <MotionViewport delay={0.2}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button className="group relative px-16 py-7 bg-white text-black text-[14px] font-black uppercase tracking-[0.3em] transition-all hover:pr-24 active:scale-95">
               Start Shopping
               <ArrowRight className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </button>
            <button className="px-16 py-7 border-2 border-white/20 text-white text-[14px] font-black uppercase tracking-[0.3em] hover:border-white transition-all active:scale-95">
               Register Now
            </button>
          </div>
        </MotionViewport>

        <div className="pt-24 flex justify-center items-center gap-12 opacity-20">
           {["Premium Quality", "Free Shipping", "Member Access"].map((text) => (
             <span key={text} className="text-[10px] font-black uppercase tracking-[0.2em] text-white italic whitespace-nowrap">
                {text}
             </span>
           ))}
        </div>
      </div>

      {/* Vertical Decorative line */}
      <div className="absolute bottom-0 right-12 w-px h-32 bg-gradient-to-t from-white/20 to-transparent" />
    </section>
  );
}
