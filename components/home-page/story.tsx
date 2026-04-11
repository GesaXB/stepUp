"use client";

import Image from "next/image";
import MotionViewport from "@/components/ui/motion-viewport";
import { ArrowRight } from "lucide-react";

export default function Story() {
  return (
    <section id="story" className="relative py-20 md:py-32 px-6 md:px-24 max-w-[1400px] mx-auto bg-white overflow-hidden border-t border-black/10">
      
      {/* Structural Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/10 pb-12 mb-16 gap-12">
         <div className="space-y-6">
            <div className="flex items-center gap-4 opacity-40">
               <span className="text-[10px] font-black uppercase tracking-widest">02</span>
               <div className="w-12 h-px bg-black" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">The Mission</span>
            </div>
            
            <MotionViewport>
              <h2 className="text-[45px] md:text-[90px] font-black italic leading-[0.8] tracking-tighter uppercase text-black">
                Movement<br />
                <span className="text-zinc-300">Architecture</span>
              </h2>
            </MotionViewport>
         </div>

         <MotionViewport delay={0.2} className="md:max-w-xl">
            <p className="text-[12px] md:text-[14px] leading-[1.8] text-zinc-500 font-bold uppercase tracking-widest italic border-l-2 border-black pl-6">
               Engineered for the urban wanderer. We build high-tensile footwear that bridges the gap between raw streetwear aesthetics and high-end technical precision.
            </p>
         </MotionViewport>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
         
         {/* Left Side: Technical Data & Small Sneaker */}
         <div className="lg:col-span-5 flex flex-col gap-12">
            
            <MotionViewport direction="right">
               <div className="w-full aspect-[4/5] bg-zinc-50 border border-zinc-200 relative group overflow-hidden">
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                  
                  <Image 
                     src="/images/story-sneaker.png" 
                     alt="Technical Sneaker Blueprint" 
                     width={400} 
                     height={500} 
                     className="relative z-10 w-full h-full object-contain p-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-1000 ease-out mix-blend-multiply"
                  />
                  
                  <div className="absolute top-6 left-6 z-20 flex gap-2">
                     <span className="bg-black text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest">Fig 1.</span>
                     <span className="bg-white border border-black text-black px-3 py-1.5 text-[9px] font-black uppercase tracking-widest">Core Base</span>
                  </div>
               </div>
            </MotionViewport>

            <MotionViewport direction="right" delay={0.2}>
               <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-black/10">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">Material Matrix</span>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">Adaptive Mesh V1</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-black/10">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">Net Weight</span>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">0.44 Kg</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-black/10">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">Origin System</span>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">Global Foundry</span>
                  </div>
               </div>
            </MotionViewport>
            
            <MotionViewport direction="right" delay={0.3}>
               <button className="w-full flex items-center justify-between px-8 py-5 border border-black hover:bg-black hover:text-white transition-colors duration-500 group">
                  <span className="text-[12px] font-black uppercase tracking-[0.2em] italic">Read Manifesto</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </MotionViewport>
         </div>

         {/* Right Side: Massive Editorial Image & Text */}
         <div className="lg:col-span-7 relative flex flex-col">
            <MotionViewport direction="left">
               <div className="aspect-square md:aspect-[4/3] relative overflow-hidden group bg-zinc-100 border border-zinc-200">
                  <Image 
                     src="/images/story-model.png" 
                     alt="Editorial Movement" 
                     fill 
                     className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-[2s] ease-out mix-blend-multiply grayscale-[20%]"
                  />
                  
                  {/* Minimalist structural overlay */}
                  <div className="absolute inset-0 border-[1px] border-black/10 m-6 pointer-events-none transition-transform duration-1000 group-hover:scale-[0.98]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center opacity-20 select-none pointer-events-none group-hover:opacity-40 transition-opacity duration-1000">
                     <div className="w-px h-full bg-black absolute" />
                     <div className="h-px w-full bg-black absolute" />
                  </div>
               </div>
            </MotionViewport>

            {/* Sneaker-Focused Quality Assurance Filler */}
            <MotionViewport direction="up" delay={0.4}>
               <div className="w-full border-t-[3px] border-black pt-5 mt-8 md:mt-16 relative">
                  
                  {/* Top Layer: Authenticity Tag */}
                  <div className="flex justify-between items-start mb-6">
                     <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] italic text-black bg-zinc-100 px-3 py-1.5 w-fit flex items-center gap-2">
                           Verified Authentic
                        </span>
                        <div className="flex items-center gap-2.5 mt-1">
                           <div className="w-1.5 h-1.5 bg-black rounded-full" />
                           <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Quality Assured by StepUP</span>
                        </div>
                     </div>
                     <div className="text-right flex flex-col gap-1 opacity-60">
                        <span className="text-[8px] font-black uppercase tracking-[0.5em] text-black">SKU: SU-V1-9492</span>
                        <span className="text-[8px] font-black uppercase tracking-[0.5em] text-black mt-1">BATCH NO: 2284</span>
                     </div>
                  </div>

                  {/* Middle Layer: Sizing Matrix & Shoe Details */}
                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-y border-black/10 py-5 gap-8">
                     
                     {/* Sizing Matrix Grid */}
                     <div className="hidden md:flex flex-col gap-1 w-32 shrink-0">
                        <span className="text-[7px] font-black uppercase tracking-widest text-zinc-400 mb-1">Availability Mtrx</span>
                        <div className="grid grid-cols-4 gap-1">
                           {[7, 7.5, 8, 8.5, 9, 9.5, 10, 11].map(size => (
                              <div key={size} className={`flex items-center justify-center p-1 border text-[7px] font-bold ${size === 9 || size === 10 ? 'bg-black text-white border-black' : 'border-black/10 text-zinc-500 hover:border-black'}`}>
                                 {size}
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Detail Lines */}
                     <div className="w-full md:flex-1 flex flex-col gap-2.5 opacity-60 px-0 md:px-8">
                         <div className="flex justify-between w-full border-b border-black/20 pb-1">
                            <span className="text-[8px] font-black uppercase tracking-[0.3em]">Condition</span>
                            <span className="text-[8px] font-black uppercase tracking-[0.3em]">Brand New</span>
                         </div>
                         <div className="flex justify-between w-full border-b border-black/20 pb-1">
                            <span className="text-[8px] font-black uppercase tracking-[0.3em]">Upper Material</span>
                            <span className="text-[8px] font-black uppercase tracking-[0.3em]">Premium Grade</span>
                         </div>
                     </div>

                     {/* Shoe Box Barcode */}
                     <div className="flex items-end gap-1 md:gap-1.5 opacity-80 shrink-0 pt-4 md:pt-0">
                        {[5, 1, 10, 2, 14, 1, 8, 2, 5, 2].map((w, i) => (
                          <div key={i} className="h-10 md:h-12 bg-black origin-bottom" style={{ width: `${w}px` }} />
                        ))}
                     </div>
                  </div>

                  {/* Bottom Layer: Typography */}
                  <div className="flex justify-between items-center mt-4 relative overflow-hidden">
                     <div className="flex gap-4 items-center opacity-70">
                        <div className="w-3 h-3 bg-black flex items-center justify-center">
                           <div className="w-1 h-1 bg-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] italic">Deadstock Secure</span>
                     </div>
                     <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-400 relative z-10 text-right max-w-[150px] leading-relaxed">
                        Tag intact. Original Box.
                     </span>
                  </div>
               </div>
            </MotionViewport>
            
            {/* Tech data overlay */}
            <div className="relative md:absolute -mt-10 mx-6 md:-left-16 md:bottom-28 bg-white border-2 border-black p-8 z-20 md:max-w-[300px] shadow-[12px_12px_0_0_#000] shrink-0 hover:-translate-y-2 transition-transform duration-500">
               <h4 className="text-[16px] font-black uppercase tracking-widest italic mb-4">Systematic Design</h4>
               <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                  Every curve, every line is calculated. We discard the unnecessary and focus entirely on structural integrity.
               </p>
               <div className="w-full h-px bg-zinc-200 mt-6 mb-4" />
               <div className="flex justify-between items-center text-[9px] font-black text-black">
                  <span className="uppercase tracking-[0.3em]">Core Status</span>
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                     <span className="uppercase tracking-[0.3em]">Active</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}
