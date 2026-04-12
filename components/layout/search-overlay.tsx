"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RECENT_SEARCHES = ["Jordan Retro 1", "Air Max 90", "Adidas Samba"];
const QUICK_LINKS = ["New Arrivals", "Best Sellers", "Sale", "Limited Edition"];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[70] bg-white/95 backdrop-blur-2xl p-6 pt-5 md:p-24 overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto h-full flex flex-col md:justify-center">
            {/* Close Button */}
            <motion.div 
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-end mb-6 md:mb-0 md:absolute md:top-12 md:right-12"
            >
              <button 
                onClick={onClose}
                className="p-2 md:p-4 hover:rotate-90 transition-transform duration-500"
              >
                <X size={28} className="text-black md:w-10 md:h-10" />
              </button>
            </motion.div>

            <div className="relative w-full">
              {/* Search Input */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <input 
                  autoFocus
                  type="text" 
                  placeholder="FIND YOUR PAIR..."
                  className="w-full text-2xl md:text-8xl font-black italic uppercase outline-none border-b-2 border-black/10 focus:border-black pb-4 md:pb-8 tracking-tighter placeholder:text-zinc-100 transition-colors"
                />
              </motion.div>
              
              <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
                 {/* Trending Drops */}
                 <div className="space-y-5 md:space-y-10">
                    <motion.span 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-[9px] md:text-[10px] font-black uppercase text-zinc-400 tracking-[0.5em] italic"
                    >
                      Trending Drops
                    </motion.span>
                    <ul className="space-y-3 md:space-y-6">
                       {RECENT_SEARCHES.map((item, i) => (
                         <motion.li 
                           key={item} 
                           initial={{ opacity: 0, x: -30 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                           className="group flex items-center gap-4 md:gap-6 cursor-pointer"
                         >
                            <span className="text-lg md:text-4xl font-black uppercase italic group-hover:pl-4 transition-all duration-500 tracking-tighter flex items-center gap-3 md:gap-4">
                               {item}
                               <motion.div initial={{ width: 0 }} whileHover={{ width: 40 }} className="h-[2px] bg-black origin-left" />
                            </span>
                         </motion.li>
                       ))}
                    </ul>
                 </div>

                 {/* Quick Filter */}
                 <div className="space-y-5 md:space-y-10">
                    <motion.span 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-[9px] md:text-[10px] font-black uppercase text-zinc-400 tracking-[0.5em] italic"
                    >
                      Quick Filter
                    </motion.span>
                    <div className="flex flex-wrap gap-2 md:gap-4">
                       {QUICK_LINKS.map((tag, i) => (
                         <motion.span 
                           key={tag} 
                           initial={{ opacity: 0, scale: 0.8, y: 10 }}
                           animate={{ opacity: 1, scale: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.9 }}
                           transition={{ duration: 0.4, delay: 0.55 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                           className="px-5 py-2.5 md:px-10 md:py-4 bg-zinc-50 hover:bg-black hover:text-white transition-all duration-500 cursor-pointer text-[10px] md:text-[11px] font-black uppercase tracking-widest italic rounded-full border border-black/5"
                         >
                            {tag}
                         </motion.span>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
