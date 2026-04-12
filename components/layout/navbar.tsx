"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavTicker } from "./nav-ticker";
import { SearchOverlay } from "./search-overlay";
import { MobileMenu } from "./mobile-menu";

const NAV_LEFT = [
  { name: "New Drops", href: "/new-drops" },
  { name: "Sneakers", href: "/products" },
  { name: "Collabs", href: "/collabs" },
];

const NAV_RIGHT = [
  { name: "Journal", href: "#story" },
  { name: "Stores", href: "#" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navHeight = useTransform(scrollY, [0, 50], ["85px", "70px"]);
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.85]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setIsScrolled(v > 20));
    return () => unsub();
  }, [scrollY]);

  return (
    <>
      <NavTicker />

      <motion.nav 
        style={{ height: navHeight }}
        className={`fixed left-0 right-0 z-[70] px-8 md:px-16 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "top-0 bg-white/95 backdrop-blur-2xl shadow-[0_4px_40px_rgba(0,0,0,0.05)]"
            : `top-6 ${isAuthPage ? "bg-white" : "bg-transparent"}`
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

              <Link href="/cart" className="relative hover:scale-110 transition-transform">
                <ShoppingBag size={18} strokeWidth={2.5} />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[7px] font-bold flex items-center justify-center rounded-full italic ring-2 ring-white">2</span>
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

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        links={[...NAV_LEFT, ...NAV_RIGHT]} 
      />
    </>
  );
}
