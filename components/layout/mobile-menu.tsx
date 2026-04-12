"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[80] bg-black text-white p-8 md:p-12 flex flex-col"
        >
          <div className="flex justify-between items-center w-full">
            <span className="text-2xl font-black italic tracking-tighter uppercase">StepUP</span>
            <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform duration-500">
              <X size={32} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8 mt-12">
             {links.map((link, i) => (
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                 key={link.name}
               >
                 <Link 
                   href={link.href} 
                   onClick={onClose}
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
  );
}
