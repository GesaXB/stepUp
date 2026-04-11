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
            {/* Backdrop blurring effect */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-[90] lg:hidden backdrop-blur-sm"
            />
            {/* Mobile Drawer Slide-in Panel */}
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[100] lg:hidden p-8 flex flex-col border-l-4 border-black"
            >
               <div className="flex justify-between items-center border-b-2 border-black pb-6 mb-8">
                  <span className="text-[20px] font-black uppercase tracking-tighter italic">Refine</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:rotate-90 transition-transform">
                     <X size={24} />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto">
                  <div className="space-y-6">
                     <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Class Type</h5>
                     <ul className="space-y-4">
                        {filters.map(filter => (
                          <li key={filter}>
                            <button 
                              onClick={() => { setActiveFilter(filter); setIsOpen(false); }}
                              className="flex items-center gap-4 w-full group bg-zinc-50 p-4 border border-zinc-200"
                            >
                              <div className={`w-4 h-4 border border-black flex items-center justify-center transition-colors ${activeFilter === filter ? 'bg-black' : 'bg-white'}`}>
                                 {activeFilter === filter && <Check size={10} className="text-white" strokeWidth={4} />}
                              </div>
                              <span className={`text-[12px] font-black uppercase tracking-widest italic ${activeFilter === filter ? 'text-black' : 'text-zinc-500'}`}>
                                {filter}
                              </span>
                            </button>
                          </li>
                        ))}
                     </ul>
                  </div>
               </div>
               
               <div className="pt-8 border-t-2 border-black mt-auto">
                  <button onClick={() => setIsOpen(false)} className="w-full bg-black text-white py-5 text-[12px] font-black uppercase tracking-[0.2em] shadow-[8px_8px_0_0_rgba(0,0,0,0.2)]">
                     View Results
                  </button>
               </div>
            </motion.div>
         </>
      )}
    </AnimatePresence>
  );
}
