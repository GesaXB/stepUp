"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FlyingCart() {
  const [flyingItems, setFlyingItems] = useState<{ id: number; x: number; y: number; image: string; targetX: number; targetY: number }[]>([]);

  useEffect(() => {
    const handleFly = (e: any) => {
      const { x, y, image } = e.detail;
      const target = document.getElementById("navbar-cart-icon");
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;

      const id = Date.now();
      setFlyingItems((prev) => [...prev, { id, x, y, image, targetX, targetY }]);

      // Cleanup item after animation finishes
      setTimeout(() => {
        setFlyingItems((prev) => prev.filter((item) => item.id !== id));
      }, 1000);
    };

    window.addEventListener("cart-fly", handleFly as EventListener);
    return () => window.removeEventListener("cart-fly", handleFly as EventListener);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence mode="popLayout">
        {flyingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ 
              left: item.x, 
              top: item.y, 
              scale: 0, 
              opacity: 0,
              rotate: -45
            }}
            animate={{ 
              left: [item.x, item.x + (item.targetX - item.x) * 0.4, item.targetX],
              top: [item.y, item.y - 150, item.targetY],
              scale: [0.5, 1.4, 0.2], 
              opacity: [0, 1, 1],
              rotate: [0, 180, 720]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 1.1, 
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.3, 1]
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full border-2 border-black shadow-[0_15px_40px_rgba(0,0,0,0.2)] p-4 z-[101] flex items-center justify-center group"
          >
            <div className="relative w-full h-full">
              <img src={item.image} alt="" className="w-full h-full object-contain drop-shadow-lg" />
              {/* Dynamic Aura */}
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-black/10"
              />
            </div>
            
            {/* Trail Particles (Simplified) */}
            <div className="absolute -z-10 blur-[1px]">
               <motion.div 
                 animate={{ opacity: [0.5, 0], scale: [1, 2] }}
                 transition={{ duration: 0.5 }}
                 className="w-10 h-10 bg-zinc-100 rounded-full" 
               />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
