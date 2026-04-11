"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const FOOTER_LINKS = [
  {
    title: "Shop Series",
    links: [
      { name: "New Arrivals", href: "/products" },
      { name: "Best Sellers", href: "/products" },
      { name: "Tech Core Releases", href: "/products" },
    ],
  },
  {
    title: "Intelligence",
    links: [
      { name: "Our Manifesto", href: "#story" },
      { name: "Terms of Access", href: "#" },
      { name: "Privacy Protocol", href: "#" },
    ],
  },
];

const SOCIALS = ["Instagram", "Twitter", "Discord", "YouTube"];

export default function Footer() {
  return (
    <footer className="relative bg-black text-white border-t-4 border-black overflow-hidden selection:bg-white selection:text-black">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 border-b border-white/10">
        
        {/* Left Panel: Branding & Newsletter */}
        <div className="lg:col-span-7 p-8 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between h-full min-h-[400px]">
           <div className="space-y-4">
              <div className="flex items-center gap-4 opacity-50 mb-12">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">SYS.INIT / 2026</span>
                 <div className="w-12 h-px bg-white" />
              </div>
              <h2 className="text-[60px] md:text-[120px] font-black uppercase italic tracking-tighter leading-[0.8]">
                Step<br /><span className="text-white/20 hover:text-white transition-colors duration-1000">UP</span>
              </h2>
           </div>
           
           <div className="space-y-6 max-w-lg mt-24">
             <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 italic">Priority Access System</h4>
             <div className="relative group">
                <input 
                 type="text" 
                 placeholder="ENTER EMAIL ID..."
                 className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-4 text-[12px] md:text-[14px] font-black uppercase tracking-widest placeholder:text-white/20 transition-all italic text-white"
                />
                <button className="absolute right-0 bottom-4 text-white hover:text-zinc-400 hover:-translate-y-1 hover:translate-x-1 transition-all">
                   <ArrowUpRight size={24} />
                </button>
             </div>
           </div>
        </div>

        {/* Right Panel: Links & Social */}
        <div className="lg:col-span-5 p-8 md:p-16 lg:p-24 flex flex-col justify-between h-full bg-zinc-950">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {FOOTER_LINKS.map((section, idx) => (
                <div key={idx} className="space-y-8">
                   <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 italic">{section.title}</h5>
                   <ul className="space-y-4">
                      {section.links.map((link, i) => (
                        <li key={i}>
                           <Link href={link.href} className="text-[12px] font-black uppercase tracking-[0.15em] text-white/80 hover:text-white hover:translate-x-2 inline-block transition-all italic">
                              {link.name}
                           </Link>
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
           </div>
           
           <div className="pt-12 border-t border-white/10">
              <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 italic mb-8">Network</h5>
              <div className="flex flex-wrap gap-8">
                 {SOCIALS.map((social, i) => (
                    <Link key={i} href="#" className="text-[11px] font-black uppercase tracking-[0.3em] text-white hover:opacity-50 transition-opacity">
                       {social}
                    </Link>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Extreme Bottom Bar & Marquee */}
      <div className="relative overflow-hidden w-full bg-black py-4 border-b-8 border-white/10">
          <motion.div 
            animate={{ x: [0, -2000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 items-center whitespace-nowrap opacity-20"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="text-[24px] md:text-[40px] font-black uppercase tracking-tighter italic">
                StepUP Global Franchise • Authentic Urban Fashion • 
              </span>
            ))}
          </motion.div>
          
          {/* Copyright overlay */}
          <div className="absolute inset-0 flex justify-center md:justify-between items-center px-8 z-10 pointer-events-none mix-blend-difference pb-2">
             <span className="text-[8px] font-black uppercase tracking-[0.6em] text-white hidden md:block">LAT 40.7128° N — LON 74.0060° W</span>
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white italic">© {new Date().getFullYear()} STEPUP SERIES V1. ALL RIGHTS RESERVED.</span>
          </div>
      </div>
    </footer>
  );
}
