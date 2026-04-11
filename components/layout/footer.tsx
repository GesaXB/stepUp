"use client";

import Link from "next/link";
import { ArrowUpRight, Camera, Send, MessageSquare } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Shop Sneakers",
    links: [
      { name: "New Arrivals", href: "/products" },
      { name: "Best Sellers", href: "/products" },
      { name: "Special Releases", href: "/products" },
    ],
  },
  {
    title: "Information",
    links: [
      { name: "Our Story", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Camera, name: "Instagram", href: "#" },
  { icon: Send, name: "Twitter", href: "#" },
  { icon: MessageSquare, name: "Discord", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative pt-32 pb-16 px-12 md:px-24 max-w-[1400px] mx-auto bg-white border-t border-zinc-100 overflow-hidden">
      {/* Background Ornament */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-50/50 -skew-x-12 translate-x-1/2 -z-10" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
        {/* Left: Brand & Newsletter */}
        <div className="lg:col-span-6 space-y-12">
          <Link href="/" className="text-6xl font-black italic tracking-tighter uppercase text-black hover:opacity-60 transition-opacity">
            StepUP
          </Link>
          
          <div className="space-y-6">
            <h4 className="text-[14px] font-black uppercase tracking-[0.3em] text-black italic">Join our Insider List</h4>
            <div className="relative max-w-sm">
               <input 
                type="text" 
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none pb-4 text-[14px] font-black uppercase tracking-widest placeholder:text-zinc-200 transition-all italic"
               />
               <button className="absolute right-0 bottom-4 hover:translate-x-2 transition-transform">
                  <ArrowUpRight size={24} />
               </button>
            </div>
          </div>

          <div className="flex gap-8 pt-4">
             {SOCIALS.map((social, i) => (
                <Link key={i} href={social.href} className="group flex items-center gap-3">
                   <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <social.icon size={20} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">{social.name}</span>
                </Link>
             ))}
          </div>
        </div>

        {/* Right: Menu Links */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-12">
           {FOOTER_LINKS.map((section, idx) => (
             <div key={idx} className="space-y-8">
                <h5 className="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-300 italic">{section.title}</h5>
                <ul className="space-y-4">
                   {section.links.map((link, i) => (
                     <li key={i}>
                        <Link href={link.href} className="text-[15px] font-black uppercase tracking-tight text-black hover:text-zinc-400 transition-colors italic">
                           {link.name}
                        </Link>
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 mt-32 pt-12 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">
           <span>© {new Date().getFullYear()} stepup global</span>
           <span>Made for the urban wanderer</span>
        </div>
        
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">
           <div className="w-2 h-2 rounded-full bg-black" />
           <span>Globally Sourced</span>
        </div>
      </div>

      {/* Extreme Bottom Watermark */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-[0.02] select-none pointer-events-none">
         <span className="text-[120px] font-black tracking-tighter italic uppercase whitespace-nowrap">AUTHENTIC FOOTWEAR GROUP</span>
      </div>
    </footer>
  );
}
