"use client";

import MotionViewport from "@/components/ui/motion-viewport";

const features = [
  {
    title: "Premium Materials",
    description: "Crafted with Japanese high-tensile mesh and hand-finished premium leather for unmatched durability.",
    index: "01",
  },
  {
    title: "Adaptive Cushioning",
    description: "Our proprietary SU-V1 foam technology adapts to your movement, providing comfort for the whole day.",
    index: "02",
  },
  {
    title: "Urban Traction",
    description: "Engineered high-grip rubber outsoles designed specifically for the varying terrains of the city jungle.",
    index: "03",
  },
];

export default function Features() {
  return (
    <section className="relative py-32 px-12 md:px-24 max-w-[1400px] mx-auto bg-white border-t border-zinc-100 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute -bottom-20 right-0 w-full whitespace-nowrap opacity-[0.02] select-none pointer-events-none text-right">
        <span className="text-[150px] md:text-[280px] font-black uppercase tracking-tighter italic">ENGINEERING / TECH</span>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start justify-between mb-32 gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-4 opacity-40">
             <span className="text-[10px] font-black">05</span>
             <div className="w-12 h-px bg-black" />
             <span className="text-[10px] font-black uppercase tracking-widest italic">The Specs</span>
          </div>
          <MotionViewport direction="right">
            <h2 className="text-[45px] md:text-[100px] font-black italic leading-[0.8] tracking-tighter uppercase text-black max-w-[800px]">
              <div className="overflow-hidden py-4">
                <span className="block">High-Performance</span>
              </div>
              <div className="overflow-hidden py-4">
                <span className="block italic text-zinc-100">Engineering</span>
              </div>
            </h2>
          </MotionViewport>
        </div>
        <div className="hidden lg:block pt-12">
           <div className="w-1 h-32 bg-zinc-50 relative">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-black" />
           </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
        {features.map((feature, idx) => (
          <MotionViewport key={idx} delay={idx * 0.1} distance={40}>
            <div className="space-y-8 group">
              <div className="flex items-end gap-4 overflow-hidden">
                 <span className="text-[40px] font-black italic text-zinc-50 group-hover:text-black transition-colors duration-700 leading-none tracking-tighter">
                   {feature.index}
                 </span>
                 <div className="w-0 h-px bg-black transition-all duration-700 group-hover:w-full mb-2" />
              </div>
              <div className="space-y-4">
                <h4 className="text-[18px] font-black uppercase italic tracking-tight text-black">{feature.title}</h4>
                <p className="text-[15px] text-zinc-500 leading-relaxed font-bold tracking-tight italic opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                  {feature.description}
                </p>
              </div>
              <div className="pt-8">
                 <button className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-300 hover:text-black transition-colors duration-500 flex items-center gap-3 group/btn">
                    Read Specs
                    <div className="w-2 h-2 rounded-full bg-zinc-200 group-hover/btn:bg-black transition-colors" />
                 </button>
              </div>
            </div>
          </MotionViewport>
        ))}
      </div>
    </section>
  );
}
