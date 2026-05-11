"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Heart, Loader2, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { addToLocalCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  item: Product;
}

export default function ProductCard({ item }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (item.status === 'Sold Out') return;
    setIsAddingToCart(true);
    // Guest can add to cart locally
    addToLocalCart(item.sku, "42", 1);
    
    // Dispatch flying animation
    window.dispatchEvent(new CustomEvent("cart-fly", { 
      detail: { x: e.clientX, y: e.clientY, image: item.image } 
    }));
    
    setTimeout(() => {
      setIsAddingToCart(false);
      setIsAdded(true);
      window.dispatchEvent(new Event('cart-update'));
      
      setTimeout(() => setIsAdded(false), 2000);
    }, 500);
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsAddingToWishlist(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku: item.sku })
      });
      if (res.status === 401) {
        // Redirect only on explicit wishlist action for guests
        window.location.href = "/login?redirect=" + window.location.pathname;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  return (
    <Link href={`/products/${item.sku}`} className="block h-full cursor-pointer">
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="group flex flex-col h-full"
      >
      {/* Clean Image Box */}
      <div className="relative w-full aspect-[4/5] bg-zinc-50 flex items-center justify-center p-8 overflow-hidden transition-colors duration-500 group-hover:bg-zinc-100 rounded-lg">
        
        <Image 
          src={item.image} 
          alt={item.name} 
          width={400} 
          height={500} 
          className="relative z-10 w-full h-auto object-contain mix-blend-multiply group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        
        {/* Simplified Accessible Tags */}
        <div className="absolute top-4 left-4 flex gap-2 z-20">
           <span className="bg-white/80 backdrop-blur-sm shadow-sm text-black px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-sm border border-black/5">{item.sku}</span>
        </div>
        
        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
          {item.status === 'Sold Out' && (
             <div className="bg-black text-white px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-sm">
               SOLD OUT
             </div>
          )}
          <button 
            onClick={handleAddToWishlist}
            disabled={isAddingToWishlist}
            className="w-8 h-8 bg-white/80 backdrop-blur-sm border border-black/5 flex items-center justify-center rounded-sm hover:bg-black hover:text-white transition-colors opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 duration-500 ease-out"
          >
            {isAddingToWishlist ? <Loader2 className="animate-spin" size={14} /> : <Heart size={14} />}
          </button>
        </div>

        {/* Smooth Quick Add Button */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-30">
           <button 
             disabled={item.status === 'Sold Out' || isAddingToCart}
             onClick={handleAddToCart}
             className={`w-full py-4 text-[13px] font-bold uppercase tracking-widest flex items-center justify-between px-6 transition-all active:scale-95 rounded-sm ${isAdded ? 'bg-zinc-100 text-black border border-black/10' : 'bg-black text-white hover:bg-zinc-800'}`}
           >
             <span>{item.status === 'Sold Out' ? 'Unavailable' : isAddingToCart ? 'Syncing...' : isAdded ? 'ADDED!' : 'Quick Add'}</span>
             {isAddingToCart ? <Loader2 className="animate-spin" size={16} /> : isAdded ? <Check size={16} className="text-green-600" /> : <ShoppingBag size={16} />}
           </button>
        </div>
      </div>

      {/* Clean Accessible Product Data */}
      <div className="mt-5 flex flex-col gap-1 px-1">
        <div className="flex justify-between items-start gap-4">
           <h3 className="text-[16px] xl:text-[18px] font-black text-black tracking-tight leading-snug">
             {item.name}
           </h3>
           <span className="text-[16px] xl:text-[18px] font-bold text-black opacity-80">{item.price}</span>
        </div>
        
        <div className="flex justify-between items-center mt-1 opacity-50">
          <span className="text-[11px] font-bold uppercase tracking-widest">{item.type}</span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest">{item.status}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'In Stock' ? 'bg-zinc-400' : item.status === 'Sold Out' ? 'bg-red-500' : 'bg-black animate-pulse'}`} />
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
