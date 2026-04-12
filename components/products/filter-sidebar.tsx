"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface FilterSidebarProps {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function FilterSidebar({ filters, activeFilter, setActiveFilter }: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block w-[200px] shrink-0 sticky top-32 h-fit">
       {/* Label */}
       <div className="flex items-center gap-3 mb-8 opacity-40">
          <div className="w-6 h-px bg-black" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] italic">Filter</span>
       </div>
       
       <div className="space-y-1.5">
          {filters.map((filter, i) => (
            <motion.button 
              key={filter}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveFilter(filter)}
              className={`flex items-center gap-3 w-full py-3 px-4 transition-all duration-300 group ${
                activeFilter === filter 
                  ? 'bg-black text-white' 
                  : 'bg-transparent hover:bg-zinc-50 text-zinc-400 hover:text-black'
              }`}
            >
              <div className={`w-3.5 h-3.5 border flex items-center justify-center transition-all shrink-0 ${
                activeFilter === filter ? 'border-white/30 bg-white/10' : 'border-zinc-200 group-hover:border-black'
              }`}>
                 {activeFilter === filter && <Check size={9} className="text-white" strokeWidth={3} />}
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest italic">
                {filter}
              </span>
            </motion.button>
          ))}
       </div>
    </aside>
  );
}
