"use client";

import { motion } from "framer-motion";
import { AdidasLogo, NikeLogo, OffWhiteLogo, FogLogo } from "./collab-logos";

export function CollabClients() {
  const clients = [
    { name: "OFF-WHITE™", icon: <OffWhiteLogo className="w-24 h-24 md:w-32 md:h-32" /> },
    { name: "ADIDAS", icon: <AdidasLogo className="w-24 h-24 md:w-32 md:h-32" /> },
    { name: "NIKE LAB", icon: <NikeLogo className="w-24 h-24 md:w-32 md:h-32" /> },
    { name: "FEAR OF GOD", icon: <FogLogo className="w-24 h-24 md:w-32 md:h-32" /> },
  ];

  return (
    <section className="border-t border-black/10 bg-white py-24 md:py-32 relative overflow-hidden">
       <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
            style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '60px 60px' }} 
       />

       <div className="max-w-[1300px] mx-auto px-6 md:px-24 flex flex-col gap-16 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-black/10 pb-8">
             <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] italic opacity-40">The Network</span>
                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none text-black">
                   Official <br />
                   <span className="text-zinc-300">Partners.</span>
                </h2>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] max-w-xs text-zinc-400 italic">
               Select entities providing architectural and technical input for StepUP's ongoing footwear thesis.
             </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/5 border border-black/5">
             {clients.map((client, i) => (
                <motion.div 
                  key={client.name}
                  whileHover={{ backgroundColor: "#000", color: "#fff" }}
                  initial={{ backgroundColor: "#fafafa", color: "#000" }}
                  transition={{ duration: 0.3 }}
                  className="w-full aspect-square flex flex-col items-center justify-center p-8 group relative overflow-hidden"
                >
                   {/* Logo Wrapper */}
                   <div className="opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out z-10">
                      {client.icon}
                   </div>
                   
                   {/* Absolute Name Overlay */}
                   <div className="absolute bottom-6 left-6 z-10">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity italic">
                        {client.name}
                      </span>
                   </div>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}
