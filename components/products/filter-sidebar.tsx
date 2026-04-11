"use client";

import { Check, SlidersHorizontal } from "lucide-react";

interface FilterSidebarProps {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function FilterSidebar({ filters, activeFilter, setActiveFilter }: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block w-[240px] shrink-0 sticky top-32 h-fit">
       <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-8">
          <span className="text-[14px] font-black uppercase tracking-widest italic">Filters</span>
          <SlidersHorizontal size={18} />
       </div>
       
       <div className="space-y-12">
          <div className="space-y-6">
             <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Class Type</h5>
             <ul className="space-y-3">
                {filters.map(filter => (
                  <li key={filter}>
                    <button 
                      onClick={() => setActiveFilter(filter)}
                      className="flex items-center gap-4 w-full group"
                    >
                      <div className={`w-4 h-4 border border-black flex items-center justify-center transition-colors ${activeFilter === filter ? 'bg-black' : 'bg-transparent group-hover:border-zinc-400'}`}>
                         {activeFilter === filter && <Check size={10} className="text-white" strokeWidth={4} />}
                      </div>
                      <span className={`text-[12px] font-black uppercase tracking-widest transition-all italic ${activeFilter === filter ? 'text-black' : 'text-zinc-400 group-hover:text-black'}`}>
                        {filter}
                      </span>
                    </button>
                  </li>
                ))}
             </ul>
          </div>
       </div>
    </aside>
  );
}
