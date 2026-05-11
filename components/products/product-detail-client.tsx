"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, ChevronRight, Check, X, Loader2, Heart } from "lucide-react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { addToLocalCart } from "@/lib/cart";

const SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12];

import type { Product } from "@/lib/products";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailProps) {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    if (!selectedSize) return;
    setIsAddingToCart(true);
    // Guest can always add to cart locally
    addToLocalCart(product.sku, selectedSize.toString(), 1);
    
    // Dispatch flying animation
    window.dispatchEvent(new CustomEvent("cart-fly", { 
      detail: { x: e.clientX, y: e.clientY, image: product.image } 
    }));

    setTimeout(() => {
      setIsAddingToCart(false);
      setIsAdded(true);
      window.dispatchEvent(new Event('cart-update'));
      setTimeout(() => setIsAdded(false), 2000);
    }, 500);
  };

  const handleAddToWishlist = async () => {
    setIsAddingToWishlist(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku: product.sku })
      });
      if (res.status === 401) {
        // Only redirect to login if they explicitly try to heart while logged out
        window.location.href = "/login?redirect=" + window.location.pathname;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAddingToWishlist(false);
    }
  };
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
                <button onClick={() => setIsSizeGuideOpen(true)} type="button" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 underline hover:text-black transition-colors">Size Guide</button>
             </div>
             <div className="grid grid-cols-5 gap-3">
                {SIZES.map(size => {
                   const isSelected = size === selectedSize;
                   const isOut = size === 11 || size === 7.5;
                   return (
                      <button 
                        key={size}
                        disabled={isOut}
                        onClick={() => setSelectedSize(size)}
                        className={`py-4 flex items-center justify-center text-[13px] font-bold transition-all border ${isSelected ? 'bg-black text-white border-black' : isOut ? 'bg-zinc-50 text-zinc-300 border-zinc-200 cursor-not-allowed line-through' : 'bg-white text-black border-zinc-200 hover:border-black'}`}
                      >
                         US {size}
                      </button>
                   );
                })}
             </div>
          </motion.div>

          {/* Action */}
          <div className="flex gap-4 mb-16">
            <motion.button 
              variants={itemVariants}
              disabled={product.status === 'Sold Out' || !selectedSize || isAddingToCart}
              whileTap={{ scale: (!selectedSize || product.status === 'Sold Out') ? 1 : 0.98 }}
              onClick={(e) => handleAddToCart(e)}
              className={`flex-1 py-6 text-[14px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isAdded ? 'bg-zinc-100 text-black border border-black/10' : 'bg-black text-white hover:bg-zinc-800'}`}
            >
              {isAddingToCart ? <Loader2 className="animate-spin" size={18} /> : (
                <>
                  {product.status === 'Sold Out' ? 'Unavailable' : !selectedSize ? 'Select Size' : isAdded ? 'Added to Cart' : 'Add to Cart'}
                  {isAdded ? <Check size={18} className="text-green-600" /> : <ShoppingBag size={18} />}
                </>
              )}
            </motion.button>

            <motion.button
              variants={itemVariants}
              disabled={isAddingToWishlist}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToWishlist}
              className="w-16 md:w-20 border border-zinc-200 flex items-center justify-center text-black hover:border-black transition-colors"
            >
              {isAddingToWishlist ? <Loader2 className="animate-spin" size={24} /> : <Heart size={24} />}
            </motion.button>
          </div>

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

       {/* Size Guide Modal (Smooth Framer Motion) */}
       <AnimatePresence>
          {isSizeGuideOpen && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6">
                {/* Backdrop overlay */}
                <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   exit={{ opacity: 0 }} 
                   onClick={() => setIsSizeGuideOpen(false)}
                   className="absolute inset-0 bg-black/20 backdrop-blur-md" 
                />
                
                {/* Modal Container */}
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95, y: 20 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.95, y: 10 }}
                   transition={{ type: "spring", damping: 25, stiffness: 200 }}
                   className="relative w-full max-w-3xl bg-white p-8 md:p-14 shadow-2xl border border-black/10 overflow-hidden"
                >
                   {/* Background Tech Grid */}
                   <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
                        style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '20px 20px' }} 
                   />
                   
                   <button 
                     onClick={() => setIsSizeGuideOpen(false)}
                     className="absolute top-6 right-6 text-zinc-400 hover:text-black hover:rotate-90 transition-all duration-300 z-20"
                     aria-label="Close Modal"
                   >
                      <X size={24} />
                   </button>
                   
                   <div className="relative z-10 space-y-12">
                      <div className="space-y-4 text-center md:text-left">
                         <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-black">Universal Protocol</h2>
                         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Measurement Matrix (Men&apos;s US)</p>
                      </div>

                       {/* Minimalist Grid Table */}
                      <div className="w-full border-t border-black/10 overflow-x-auto pb-4">
                         <table className="w-full text-[11px] font-bold uppercase tracking-widest text-left whitespace-nowrap">
                            <thead>
                               <tr className="border-b border-black/10">
                                  <th className="py-4 pl-4 font-black">US (Men)</th>
                                  <th className="py-4 font-black">UK</th>
                                  <th className="py-4 font-black">EU</th>
                                  <th className="py-4 font-black">CM</th>
                               </tr>
                            </thead>
                            <tbody>
                               {[
                                 { us: "7", uk: "6", eu: "40", cm: "25" },
                                 { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" },
                                 { us: "8", uk: "7", eu: "41", cm: "26" },
                                 { us: "8.5", uk: "7.5", eu: "42", cm: "26.5" },
                                 { us: "9", uk: "8", eu: "42.5", cm: "27" },
                                 { us: "9.5", uk: "8.5", eu: "43", cm: "27.5" },
                                 { us: "10", uk: "9", eu: "44", cm: "28" },
                                 { us: "10.5", uk: "9.5", eu: "44.5", cm: "28.5" },
                                 { us: "11", uk: "10", eu: "45", cm: "29" },
                                 { us: "12", uk: "11", eu: "46", cm: "30" }
                               ].map((row, idx) => (
                                 <tr key={idx} className="border-b border-black/5 hover:bg-zinc-50 transition-colors">
                                    <td className="py-3 pl-4 text-black italic font-black">US {row.us}</td>
                                    <td className="py-3 text-zinc-500">{row.uk}</td>
                                    <td className="py-3 text-zinc-500">{row.eu}</td>
                                    <td className="py-3 text-zinc-500">{row.cm}</td>
                                 </tr>
                               ))}
                            </tbody>
                         </table>
                      </div>
                      
                      <div className="bg-zinc-50 p-6 border-l-2 border-black flex flex-col gap-2">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] italic">Sizing Notice</p>
                         <p className="text-[11px] font-bold text-zinc-500 leading-relaxed uppercase">
                            Fits true to typical protocol. For individuals requiring a wider parameter, we advise escalating by 0.5 sizes for optimal functionality.
                         </p>
                      </div>
                   </div>
                </motion.div>
             </div>
          )}
       </AnimatePresence>
    </div>
  );
}
