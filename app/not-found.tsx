"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-black selection:text-white">
      <main className="flex-1 relative flex flex-col items-center justify-center px-12 md:px-24 overflow-hidden pt-32">
        {/* Background Technical Ornament */}
        <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
        />
        
        {/* Large Faded 404 */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 0.05, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
        >
           <h1 className="text-[30vw] md:text-[40vw] font-black italic tracking-tighter leading-none text-black">
              404
           </h1>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-12">
          {/* Top Label */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 opacity-30"
          >
             <span className="text-[10px] font-black">ERR_CODE: 404</span>
             <div className="w-12 h-px bg-black" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Out of Reach</span>
          </motion.div>

          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter text-black leading-tight"
            >
              The Pair is <br /> <span className="text-zinc-300">Out of Reach</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-500 font-bold uppercase tracking-tight italic max-w-lg mx-auto leading-relaxed"
            >
              The page you are looking for has already dropped. <br /> 
              Move back to the homepage to catch the latest series.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-8"
          >
            <Link 
              href="/" 
              className="group flex items-center justify-center gap-4 bg-black text-white px-16 py-6 text-[14px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-zinc-800 transition-all italic active:scale-95"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
              Catch Next Drop
            </Link>
          </motion.div>
        </div>

        {/* Bottom Editorial Corner */}
        <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-end opacity-20 italic">
           <span className="text-[9px] font-black uppercase tracking-[0.5em]">System Status: Connected</span>
           <span className="text-[9px] font-black uppercase tracking-[0.5em]">StepUP GLOBAL NETWORK</span>
        </div>
      </main>
    </div>
  );
}
