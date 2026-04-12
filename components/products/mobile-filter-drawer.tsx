"use client";

import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function MobileFilterDrawer({ isOpen, setIsOpen, filters, activeFilter, setActiveFilter }: MobileFilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
         <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] lg:hidden"
            />

            {/* Drawer Panel */}
            <motion.div 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              exit={{ y: "100%" }} 
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-[100] lg:hidden bg-white rounded-t-2xl max-h-[70vh] flex flex-col"
            >
               {/* Handle */}
               <div className="flex justify-center pt-3 pb-2">
                 <div className="w-10 h-1 bg-zinc-200 rounded-full" />
               </div>

               {/* Header */}
               <div className="flex justify-between items-center px-6 pb-5 border-b border-black/5">
                  <span className="text-[16px] font-black uppercase tracking-tight italic">Filter</span>
                  <button onClick={() => setIsOpen(false)} className="p-1.5 hover:rotate-90 transition-transform duration-300">
                     <X size={20} />
                  </button>
               </div>
               
               {/* Filter Options */}
               <div className="flex-1 overflow-y-auto px-6 py-5">
                  <div className="space-y-1.5">
                     {filters.map((filter, i) => (
                       <motion.button
                         key={filter}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                         onClick={() => { setActiveFilter(filter); setIsOpen(false); }}
                         className={`flex items-center gap-4 w-full py-4 px-5 transition-all duration-300 ${
                           activeFilter === filter 
                             ? 'bg-black text-white' 
                             : 'bg-zinc-50 text-zinc-500 active:bg-zinc-100'
                         }`}
                       >
                         <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                           activeFilter === filter ? 'border-white/30' : 'border-zinc-300'
                         }`}>
                            {activeFilter === filter && <Check size={10} className="text-white" strokeWidth={3} />}
                         </div>
                         <span className="text-[12px] font-black uppercase tracking-widest italic">
                           {filter}
                         </span>
                       </motion.button>
                     ))}
                  </div>
               </div>
               
               {/* Safe Area Padding */}
               <div className="px-6 pb-8 pt-4 border-t border-black/5">
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="w-full bg-black text-white py-4 text-[11px] font-black uppercase tracking-[0.2em] italic active:scale-[0.98] transition-transform"
                  >
                     Apply Filter
                  </button>
               </div>
            </motion.div>
         </>
      )}
    </AnimatePresence>
  );
}
