"use client";

import Image from "next/image";
import { ShoppingBag, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12];

interface ProductDetailProps {
  product: {
    name: string;
    image: string;
    price: string;
    sku: string;
    status: string;
    type: string;
    description: string;
  };
}

export default function ProductDetailClient({ product }: ProductDetailProps) {
  // Animation configuration for staggering children elements smoothly
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 20 } }
  };

  return (
    <div className="px-6 md:px-16 max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
       
       {/* Left Column: Huge Tech Image Presentation */}
       <motion.div 
         initial={{ opacity: 0, x: -30 }} 
         animate={{ opacity: 1, x: 0 }} 
         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         className="lg:col-span-7 flex flex-col gap-4"
       >
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">
             <Link href="/products" className="hover:text-black transition-colors">Catalog</Link>
             <ChevronRight size={10} />
             <span className="hover:text-black transition-colors cursor-pointer">{product.type}</span>
             <ChevronRight size={10} />
             <span className="text-black">{product.sku}</span>
          </div>
          
          <div className="relative w-full aspect-square md:aspect-4/3 bg-zinc-50 border-2 border-zinc-100 flex items-center justify-center p-12 overflow-hidden rounded-xl">
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
             
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1 }} 
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
               className="relative w-full h-full"
             >
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-contain p-12 mix-blend-multiply" 
                  priority
                />
             </motion.div>

             <div className="absolute top-6 left-6 flex items-center gap-3 opacity-30">
                <div className="w-8 h-px bg-black" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">System Spec</span>
             </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-2">
             {[1, 2, 3].map((i, idx) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1), duration: 0.5 }}
                  className="aspect-[4/3] bg-zinc-50 border border-zinc-100 rounded-lg p-6 relative flex items-center justify-center hover:opacity-100 cursor-pointer transition-opacity"
                >
                   <Image src={product.image} alt="Thumbnail" fill className="object-contain mix-blend-multiply p-4 max-w-[80%] mx-auto" />
                </motion.div>
             ))}
          </div>
       </motion.div>

       {/* Right Column: Information Matrix */}
       <motion.div 
         variants={containerVariants}
         initial="hidden"
         animate="show"
         className="lg:col-span-5 flex flex-col pt-4 md:pt-12"
       >
          <motion.div variants={itemVariants} className="flex justify-between items-start gap-4 mb-8 border-b-2 border-black pb-8">
             <h1 className="text-[32px] md:text-[55px] font-black italic uppercase tracking-tighter leading-[0.9] text-black">
               {product.name}
             </h1>
             <span className="text-[24px] md:text-[32px] font-bold text-black mt-1">{product.price}</span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
             <div className={`w-2 h-2 rounded-full ${product.status === 'In Stock' ? 'bg-zinc-400' : product.status === 'Sold Out' ? 'bg-red-500' : 'bg-black animate-pulse'}`} />
             <span className="text-[12px] font-black uppercase tracking-[0.3em]">{product.status}</span>
             <span className="text-[12px] font-bold text-zinc-400 mx-2">|</span>
             <span className="text-[12px] font-bold uppercase tracking-widest text-zinc-500">{product.description}</span>
          </motion.div>

          {/* Sizing Matrix */}
          <motion.div variants={itemVariants} className="space-y-4 mb-12">
             <div className="flex justify-between items-end">
                <span className="text-[12px] font-black uppercase tracking-[0.3em] italic">Size Configuration</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 underline cursor-pointer hover:text-black transition-colors">Size Guide</span>
             </div>
             <div className="grid grid-cols-5 gap-3">
                {SIZES.map(size => {
                   const isSelected = size === 9; // Mock selected state
                   const isOut = size === 11 || size === 7.5;
                   return (
                      <button 
                        key={size}
                        disabled={isOut}
                        className={`py-4 flex items-center justify-center text-[13px] font-bold transition-all border ${isSelected ? 'bg-black text-white border-black' : isOut ? 'bg-zinc-50 text-zinc-300 border-zinc-200 cursor-not-allowed line-through' : 'bg-white text-black border-zinc-200 hover:border-black'}`}
                      >
                         US {size}
                      </button>
                   );
                })}
             </div>
          </motion.div>

          {/* Action */}
          <motion.button 
            variants={itemVariants}
            disabled={product.status === 'Sold Out'}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black text-white py-6 text-[14px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-6 hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-16"
          >
            {product.status === 'Sold Out' ? 'Currently Unavailable' : 'Add to Delivery Cart'}
            <ShoppingBag size={18} />
          </motion.button>

          {/* Technical Specifications Accordions */}
          <motion.div variants={itemVariants} className="border-t border-black/10">
             <div className="py-6 border-b border-black/10 flex justify-between items-center cursor-pointer group hover:bg-zinc-50 transition-colors px-2 -mx-2">
                <span className="text-[13px] font-black uppercase tracking-widest">Authentication & Materials</span>
                <Check size={16} className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="py-6 border-b border-black/10 flex justify-between items-center cursor-pointer group hover:bg-zinc-50 transition-colors px-2 -mx-2">
                <span className="text-[13px] font-black uppercase tracking-widest">Shipping Matrix Protocol</span>
                <Check size={16} className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="py-6 border-b border-black/10 flex justify-between items-center cursor-pointer group hover:bg-zinc-50 transition-colors px-2 -mx-2">
                <span className="text-[13px] font-black uppercase tracking-widest">Return Policy</span>
                <Check size={16} className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
          </motion.div>
       </motion.div>
    </div>
  );
}
