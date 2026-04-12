"use client";

import { motion } from "framer-motion";

interface ProductsHeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeNumber?: string;
  resultCount?: number;
}

export default function ProductsHeader({ 
  title = "All", 
  subtitle = "Products", 
  badge = "Database", 
  badgeNumber = "01",
  resultCount 
}: ProductsHeaderProps) {
  return (
    <div className="px-6 md:px-16 max-w-[1600px] mx-auto mb-12 md:mb-20 relative">
       {/* Background Grid Accent */}
       <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none w-1/3 h-full" 
            style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '30px 30px' }} 
       />
       
       <div className="relative z-10 space-y-8 border-b border-black/10 pb-10">
          {/* Editorial Badge */}
          <div className="flex items-center gap-4 opacity-40">
             <span className="text-[10px] font-black">{badgeNumber}</span>
             <div className="w-10 h-px bg-black" />
             <span className="text-[10px] font-black uppercase tracking-widest italic">{badge}</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[42px] md:text-[90px] lg:text-[110px] font-black italic uppercase tracking-tighter leading-[0.85] text-black"
            >
              {title}<br />
              <span className="text-zinc-200">{subtitle}</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-start md:items-end gap-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-400">Live Inventory</span>
              </div>
              {resultCount !== undefined && (
                <p className="text-[12px] font-bold uppercase tracking-widest italic text-zinc-400 border-l-2 border-black pl-4 md:border-l-0 md:pl-0 md:border-r-2 md:pr-4">
                  {resultCount} {resultCount === 1 ? 'Model' : 'Models'} Available
                </p>
              )}
            </motion.div>
          </div>
       </div>
    </div>
  );
}
