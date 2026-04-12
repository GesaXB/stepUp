"use client";

import Image from "next/image";
import MotionViewport from "@/components/ui/motion-viewport";
import { motion } from "framer-motion";

const partners = ["Adidas", "Off-White", "Fear of God", "New Balance", "Sacai", "Stüssy"];

export default function Collaboration() {
  return (
    <section className="relative bg-white text-black overflow-hidden">

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      {/* ── Top Bar ── */}
      <div className="relative z-20 flex items-center justify-between px-6 md:px-24 py-8 md:py-8 border-t border-b border-black/10">
        <div className="flex items-center gap-4 opacity-40">
          <span className="text-[10px] font-black">04</span>
          <div className="w-10 h-px bg-black" />
          <span className="text-[10px] font-black uppercase tracking-widest italic">Collaboration</span>
        </div>
        <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-30 ml-6">Exclusive Partners</span>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* ── MOBILE LAYOUT ── */}
      {/* ═══════════════════════════════════════════ */}
      <div className="md:hidden relative z-10">

        {/* Hero Image with Overlay Heading */}
        <MotionViewport direction="none" delay={0.1}>
          <div className="relative aspect-[3/4] w-full overflow-hidden group">
            <Image
              src="/images/hero-main.png"
              alt="Collaboration editorial"
              fill
              className="object-cover grayscale"
            />
            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/10 pointer-events-none" />

            {/* Overlay Heading — pinned to bottom of image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
              <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-3">Strategic Alliance / 2026</p>
              <h2 className="text-[52px] font-black italic leading-[0.85] tracking-tighter uppercase text-black">
                <span className="block">Beyond</span>
                <span className="block text-zinc-300">Limits</span>
              </h2>
            </div>

            {/* Corner Badge */}
            <div className="absolute top-5 right-5 opacity-40">
              <div className="w-8 h-8 rounded-full border border-black/30 flex items-center justify-center text-[9px] font-black italic">
                ×
              </div>
            </div>
          </div>
        </MotionViewport>

        {/* Content Block */}
        <div className="px-6 py-8 space-y-8">
          <MotionViewport delay={0.15}>
            <p className="text-[13px] text-zinc-500 font-bold italic leading-relaxed tracking-tight border-l-2 border-black pl-5">
              When two creative forces collide, the result transcends footwear. Each partnership is a statement of shared vision.
            </p>
          </MotionViewport>

          {/* Stats Row — compact horizontal */}
          <MotionViewport delay={0.2}>
            <div className="flex items-center justify-between border-t border-b border-black/5 py-5">
              {[
                { num: "06", label: "Partners" },
                { num: "14", label: "Countries" },
                { num: "48", label: "SKUs" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[22px] font-black italic tracking-tighter">{stat.num}</span>
                  <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-zinc-300">{stat.label}</span>
                </div>
              ))}
            </div>
          </MotionViewport>

          {/* CTA */}
          <MotionViewport delay={0.25}>
            <button className="w-full flex items-center justify-between py-4 border border-black/10 px-6 group active:bg-zinc-50 transition-colors">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] italic">Explore All Collabs</span>
              <span className="text-[14px] group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </MotionViewport>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* ── DESKTOP LAYOUT ── */}
      {/* ═══════════════════════════════════════════ */}
      <div className="hidden md:grid relative z-10 grid-cols-12 min-h-[85vh]">

        {/* Left: Editorial Text Panel */}
        <div className="col-span-5 flex flex-col justify-between p-16 relative">
          <div className="space-y-10 pt-8">
            <MotionViewport direction="right">
              <div className="space-y-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-300">Strategic Alliance / 2026</p>
                <h2 className="text-[80px] lg:text-[100px] font-black italic leading-[0.85] tracking-tighter uppercase text-black">
                  <span className="block">Beyond</span>
                  <span className="block text-zinc-200">Limits</span>
                </h2>
              </div>
            </MotionViewport>

            <MotionViewport direction="right" delay={0.15}>
              <p className="text-[15px] text-zinc-500 font-bold italic leading-relaxed tracking-tight max-w-sm border-l-2 border-black pl-6">
                When two creative forces collide, the result transcends footwear. Each partnership is a statement of shared vision and relentless innovation.
              </p>
            </MotionViewport>

            <MotionViewport direction="right" delay={0.25}>
              <button className="flex items-center gap-4 group mt-4">
                <span className="text-[11px] font-black uppercase tracking-[0.25em] italic text-zinc-400 group-hover:text-black transition-colors duration-500">Explore All</span>
                <div className="w-10 h-px bg-zinc-300 group-hover:w-16 group-hover:bg-black transition-all duration-500" />
              </button>
            </MotionViewport>
          </div>

          {/* Bottom Stats */}
          <MotionViewport delay={0.3}>
            <div className="flex gap-12 mt-auto pt-16">
              <div className="space-y-1">
                <span className="text-[32px] font-black italic tracking-tighter text-black">06</span>
                <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-300">Global Partners</p>
              </div>
              <div className="space-y-1">
                <span className="text-[32px] font-black italic tracking-tighter text-black">14</span>
                <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-300">Countries</p>
              </div>
              <div className="space-y-1">
                <span className="text-[32px] font-black italic tracking-tighter text-black">48</span>
                <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-300">Exclusive SKUs</p>
              </div>
            </div>
          </MotionViewport>
        </div>

        {/* Right: Cinematic Image */}
        <div className="col-span-7 relative">
          <MotionViewport direction="none" delay={0.2} className="h-full w-full">
            <div className="relative h-full w-full overflow-hidden group cursor-crosshair">
              <Image
                src="/images/hero-main.png"
                alt="Collaboration editorial"
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge */}
              <div className="absolute top-8 right-8 flex items-center gap-3 opacity-40 group-hover:opacity-80 transition-opacity duration-700">
                <div className="w-10 h-10 rounded-full border border-black/30 flex items-center justify-center text-[11px] font-black italic group-hover:border-black transition-colors duration-500">
                  ×
                </div>
              </div>

              {/* Bottom Image Label */}
              <div className="absolute bottom-8 right-8 text-right space-y-1 opacity-40 group-hover:opacity-70 transition-opacity duration-700">
                <p className="text-[8px] font-black uppercase tracking-[0.5em] text-black">Campaign S/S &apos;26</p>
                <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-zinc-500">Editorial 001 / 003</p>
              </div>

              {/* Vertical Text */}
              <div className="absolute top-8 left-8">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-black/20" style={{ writingMode: 'vertical-rl' }}>
                  Collab Series — 2026
                </span>
              </div>
            </div>
          </MotionViewport>
        </div>
      </div>

      {/* ── Partner Marquee Strip ── */}
      <div className="relative z-20 border-t border-black/10 py-5 md:py-6 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-0 whitespace-nowrap"
        >
          {Array.from({ length: 4 }).map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-0 shrink-0">
              {partners.map((name, i) => (
                <div key={`${setIdx}-${i}`} className="flex items-center gap-0 shrink-0">
                  <span className="text-[12px] md:text-[15px] font-black uppercase italic tracking-tight text-zinc-300 px-5 md:px-10 hover:text-black transition-colors duration-500 cursor-pointer">
                    {name}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-zinc-200 shrink-0" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
