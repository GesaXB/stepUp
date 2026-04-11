"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, X, User, Menu } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV_LEFT = [
  { name: "New Drops", href: "/products" },
  { name: "Sneakers", href: "/products" },
  { name: "Collabs", href: "#" },
];

const NAV_RIGHT = [
  { name: "Journal", href: "#story" },
  { name: "Stores", href: "#" },
];

const RECENT_SEARCHES = ["Jordan Retro 1", "Air Max 90", "Adidas Samba"];
const QUICK_LINKS = ["New Arrivals", "Best Sellers", "Sale", "Limited Edition"];

export default function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navHeight = useTransform(scrollY, [0, 50], ["110px", "80px"]);
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.85]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setIsScrolled(v > 20));
    return () => unsub();
  }, [scrollY]);

  return (
    <>
      {/* Ticker / Announcement Bar - Kept for consistency */}
      <div className="absolute top-0 left-0 right-0 z-[60] bg-black py-2 px-12 overflow-hidden whitespace-nowrap border-b border-white/10">
         <motion.div 
           animate={{ x: [0, -500] }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="flex gap-12 items-center"
         >
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="text-[9px] font-black uppercase tracking-[0.3em] text-white italic">
                Free Worldwide Shipping on all orders over $200 • New Collection SU-V1 Out Now • limited editions available • 
              </span>
            ))}
         </motion.div>
      </div>

      <motion.nav 
        style={{ height: navHeight }}
        className={`fixed left-0 right-0 z-50 px-8 md:px-16 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "top-0 bg-white/90 backdrop-blur-2xl shadow-[0_4px_40px_rgba(0,0,0,0.03)]"
            : `top-8 ${isAuthPage ? "bg-white" : "bg-transparent"}`
        }`}
      >
        <div className="max-w-[1500px] mx-auto h-full flex items-center justify-between relative">
          {/* Burger Menu for Mobile */}
          <button className="lg:hidden text-black p-2" onClick={() => setIsMobileMenuOpen(true)}>
             <Menu size={24} />
          </button>

          {/* Left Links (Desktop) */}
          <div className="hidden lg:flex gap-10 text-[11px] font-black text-black w-1/3 uppercase tracking-[0.25em] h-full items-center italic">
            {NAV_LEFT.map((link) => (
              <Link key={link.name} href={link.href} className="group relative py-1 overflow-hidden">
                <span className="block group-hover:-translate-y-full transition-transform duration-500">{link.name}</span>
                <span className="absolute top-full left-0 block group-hover:-translate-y-full transition-transform duration-500 text-zinc-400">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Logo */}
          <motion.div style={{ scale: logoScale }} className="flex justify-center w-1/3">
            <Link href="/" className="text-3xl md:text-5xl font-black tracking-tighter text-black italic uppercase transition-all duration-700 hover:tracking-normal active:scale-95 select-none no-underline">
              StepUP
            </Link>
          </motion.div>

          {/* Right Icons & Quick Links */}
          <div className="flex items-center justify-end gap-10 w-1/3 h-full">
            <div className="hidden lg:flex gap-10 text-[11px] font-black text-black uppercase tracking-[0.25em] italic">
               {NAV_RIGHT.map((link) => (
                 <Link key={link.name} href={link.href} className="group relative py-1 overflow-hidden">
                   <span className="block group-hover:-translate-y-full transition-transform duration-500">{link.name}</span>
                   <span className="absolute top-full left-0 block group-hover:-translate-y-full transition-transform duration-500 text-zinc-400">{link.name}</span>
                 </Link>
               ))}
            </div>

            <div className="flex items-center gap-5 md:gap-8 text-black">
              <button onClick={() => setIsSearchOpen(true)} className="hover:scale-110 transition-transform">
                <Search size={18} strokeWidth={2.5} />
              </button>
              
              <Link href="#" className="hidden sm:block hover:scale-110 transition-transform">
                <Heart size={18} strokeWidth={2.5} />
              </Link>

              <Link href="#" className="relative hover:scale-110 transition-transform">
                <ShoppingBag size={18} strokeWidth={2.5} />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[7px] font-bold flex items-center justify-center rounded-full italic ring-2 ring-white">1</span>
              </Link>

              <Link href="/login" className="hover:scale-110 transition-transform">
                <User size={18} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Modern Clean Scrolled Border */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent transition-opacity duration-1000 ${
            isScrolled || isAuthPage ? "opacity-100" : "opacity-0"
          }`} 
        />
      </motion.nav>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-white/95 backdrop-blur-2xl p-12 md:p-24"
          >
            <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-12 right-12 p-4 hover:rotate-90 transition-transform duration-500"
              >
                <X size={40} className="text-black" />
              </button>

              <div className="relative w-full">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="FIND YOUR NEXT PAIR..."
                  className="w-full text-4xl md:text-8xl font-black italic uppercase outline-none border-b-2 border-black/10 focus:border-black pb-8 tracking-tighter placeholder:text-zinc-100 transition-all"
                />
                
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-24">
                   <div className="space-y-10">
                      <span className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.5em] italic">Trending Drops</span>
                      <ul className="space-y-6">
                         {RECENT_SEARCHES.map((item) => (
                           <li key={item} className="group flex items-center gap-6 cursor-pointer">
                              <span className="text-2xl md:text-4xl font-black uppercase italic group-hover:pl-4 transition-all duration-500 tracking-tighter flex items-center gap-4">
                                 {item}
                                 <motion.div initial={{ width: 0 }} whileHover={{ width: 40 }} className="h-[2px] bg-black origin-left" />
                              </span>
                           </li>
                         ))}
                      </ul>
                   </div>
                   <div className="space-y-10">
                      <span className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.5em] italic">Quick Filter</span>
                      <div className="flex flex-wrap gap-4">
                         {QUICK_LINKS.map((tag) => (
                           <span key={tag} className="px-10 py-4 bg-zinc-50 hover:bg-black hover:text-white transition-all duration-500 cursor-pointer text-[11px] font-black uppercase tracking-widest italic rounded-full border border-black/5">
                              {tag}
                           </span>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[80] bg-black text-white p-8 md:p-12 flex flex-col"
          >
            <div className="flex justify-between items-center w-full">
              <span className="text-2xl font-black italic tracking-tighter uppercase">StepUP</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:rotate-90 transition-transform duration-500">
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-8 mt-12">
               {[...NAV_LEFT, ...NAV_RIGHT].map((link, i) => (
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.2 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                   key={link.name}
                 >
                   <Link 
                     href={link.href} 
                     onClick={() => setIsMobileMenuOpen(false)}
                     className="text-[45px] font-black uppercase italic tracking-tighter hover:pl-4 transition-all duration-300 flex items-center gap-4"
                   >
                     {link.name}
                   </Link>
                 </motion.div>
               ))}
            </div>

            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               transition={{ delay: 0.8 }}
               className="mt-auto pt-10 border-t border-white/10 flex flex-col gap-8"
            >
               <div className="flex flex-col gap-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Follow Us</span>
                 <div className="flex gap-6 mt-2">
                    {["Instagram", "Twitter", "Tiktok"].map(social => (
                      <Link key={social} href="#" className="text-[12px] font-bold uppercase italic tracking-widest hover:text-zinc-300">{social}</Link>
                    ))}
                 </div>
               </div>
               <div className="flex justify-between items-center w-full opacity-40">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] italic">StepUP © 2026</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] italic">SYS.V1</span>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
