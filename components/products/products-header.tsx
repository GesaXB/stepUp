"use client";

import { motion } from "framer-motion";

export default function ProductsHeader() {
  return (
    <div className="px-6 md:px-16 max-w-[1600px] mx-auto mb-16 md:mb-24 relative border-b-2 border-black pb-12">
       <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none w-1/2 h-full" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
       
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">
          <div className="space-y-6">
             <div className="flex items-center gap-4 opacity-50">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Database</span>
                <div className="w-12 h-px bg-black" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">System 01</span>
             </div>
             
             <motion.h1 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="text-[50px] md:text-[140px] font-black italic uppercase tracking-tighter leading-[0.85] text-black"
             >
               Global<br />
               <span className="text-zinc-200">Catalog</span>
             </motion.h1>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 italic">Inventory Sync: Active</span>
             </div>
             <div className="w-full md:w-[300px] border border-black p-4 md:p-6 bg-zinc-50 shadow-[8px_8px_0_0_#000]">
                <span className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-50">Auth Check</span>
                <span className="text-[12px] font-bold uppercase tracking-widest leading-relaxed text-black italic">
                   All models presented are physically verified against StepUP global quality parameters.
                </span>
             </div>
          </div>
       </div>
    </div>
  );
}
