"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Trash2, ArrowUpRight, Loader2, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PRODUCTS } from "@/lib/products";
import { addToLocalCart } from "@/lib/cart";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthRequired, setIsAuthRequired] = useState(false);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist", { cache: "no-store", headers: { 'Pragma': 'no-cache' } });
      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthRequired(true);
          return;
        }
        throw new Error("Failed to fetch wishlist");
      }
      const data = await res.json();
      const mapped = data.items.map((item: any) => {
        const productDef = PRODUCTS.find(p => p.sku === item.sku);
        if (!productDef) return null;
        return {
          ...productDef,
          id: item.sku,
        };
      }).filter(Boolean);
      setWishlistItems(mapped);
      setIsAuthRequired(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeItem = async (sku: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== sku));
    try {
      const res = await fetch(`/api/wishlist?sku=${sku}`, { method: "DELETE" });
      if (res.status === 401) setIsAuthRequired(true);
    } catch (err) {
      fetchWishlist();
    }
  };

  const handleAddToCart = (sku: string) => {
    // Guest can add to cart from wishlist too
    addToLocalCart(sku, "42", 1);
    window.dispatchEvent(new Event('cart-update'));
  };

  return (
    <main className="min-h-screen bg-white pt-40 pb-24 px-8 md:px-16 selection:bg-black selection:text-white overflow-x-hidden">
      <div className="max-w-[1240px] mx-auto space-y-24">
        
        <header className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-black/5 pb-16 relative">
           <div className="absolute top-0 right-0 opacity-[0.015] pointer-events-none select-none hidden lg:block">
              <span className="text-[200px] font-black italic uppercase leading-none tracking-tighter">WISHLIST</span>
           </div>
           
           <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-4 opacity-30">
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">{isAuthRequired ? 'Restricted Access' : 'Archive // Curator'}</span>
                 <div className="w-10 h-px bg-black" />
              </div>
              <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-black">
                {isAuthRequired ? 'Access' : 'Saved'} <br /> <span className="text-zinc-200">{isAuthRequired ? 'Denied.' : 'Vault.'}</span>
              </h1>
           </div>

           <div className="text-right space-y-2 md:pb-2 z-10">
              <p className="text-[11px] font-black uppercase italic tracking-widest text-zinc-400">{isAuthRequired ? 'AUTHENTICATION PENDING' : `${wishlistItems.length} ITEMS CURATED`}</p>
              <div className="flex gap-2 justify-end">
                 {Array.from({ length: 5 }).map((_, i) => (
                   <div key={i} className={`w-6 h-1 ${isAuthRequired ? 'bg-amber-500/20' : 'bg-black/10'}`} />
                 ))}
              </div>
           </div>
        </header>

        {isLoading ? (
          <div className="py-40 flex justify-center items-center">
            <Loader2 className="animate-spin text-zinc-300" size={48} />
          </div>
        ) : isAuthRequired ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-40 flex flex-col items-center text-center gap-10 max-w-2xl mx-auto"
          >
             <div className="w-24 h-24 bg-zinc-50 border border-black/5 rounded-full flex items-center justify-center mb-4">
                <Lock size={32} className="text-black" />
             </div>
             <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-black">Encrypted Section.</h2>
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-400 leading-relaxed">
                   You are attempting to access a secured personal vault. Please identify yourself via the authentication protocol to view and manage your curated artifacts.
                </p>
             </div>
             <Link href="/login?redirect=/wishlist" className="bg-black text-white px-12 py-5 text-[12px] font-black uppercase tracking-[0.4em] italic hover:bg-zinc-800 transition-all flex items-center gap-4 group">
                Initiate Login Protocol
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 pt-10">
               {wishlistItems.map((product, i) => (
                 <motion.div 
                   key={product.id}
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="group relative"
                 >
                    <div className="aspect-[4/5] bg-zinc-50 relative overflow-hidden group mb-8 border border-black/5 shadow-sm">
                       <Image 
                         src={product.image} 
                         alt={product.name} 
                         fill 
                         className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105" 
                       />
                       
                       <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-16 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                          <button 
                            onClick={() => removeItem(product.id)}
                            className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-zinc-800 shadow-2xl active:scale-90 transition-all"
                            title="Remove from Archive"
                          >
                            <Trash2 size={18} />
                          </button>
                       </div>

                       <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 z-20">
                          <div className="bg-white/95 backdrop-blur-md px-4 py-2 border border-black/5 shadow-2xl space-y-1">
                             <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Release Seq.</p>
                             <p className="text-[10px] font-black italic uppercase tracking-widest">ID: {2026 + i}-X77</p>
                          </div>
                       </div>
                       
                       <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                    </div>

                    <div className="space-y-6">
                       <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest italic">{product.type || product.category}</p>
                            <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter leading-none group-hover:text-zinc-600 transition-colors">{product.name}</h3>
                          </div>
                          <div className="text-right">
                             <p className="text-xl font-black italic tracking-tighter leading-none">{product.price}</p>
                             <p className="text-[8px] font-bold text-zinc-300 uppercase mt-1">VAT Included</p>
                          </div>
                       </div>
                       
                       <div className="flex gap-3 pt-6">
                          <button onClick={() => handleAddToCart(product.id)} className="flex-1 bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.3em] italic group-hover:bg-zinc-900 transition-all flex items-center justify-center gap-4 active:scale-[0.98]">
                             Add to Cart <ShoppingBag size={14} />
                          </button>
                          <Link 
                            href={`/products/${product.id}`} 
                            className="w-16 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 ease-in-out"
                          >
                             <ArrowUpRight size={20} />
                          </Link>
                       </div>
                    </div>

                    <div className="absolute -bottom-8 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-1000" />
                 </motion.div>
               ))}
            </div>

            {wishlistItems.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-60 text-center space-y-12"
              >
                 <div className="space-y-4">
                    <h2 className="text-6xl md:text-8xl font-black italic uppercase text-zinc-100 leading-none">Archive is <br /> Void.</h2>
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-300 italic">No items found in curator selection</p>
                 </div>
                 <Link href="/products" className="inline-flex items-center gap-6 border-b-2 border-black pb-3 text-[13px] font-black uppercase tracking-[0.3em] italic hover:opacity-40 transition-all">
                    Initiate Discovery Protocol <ArrowUpRight size={16} />
                 </Link>
              </motion.div>
            )}
          </>
        )}

        <div className="pt-40 opacity-[0.03] select-none pointer-events-none">
           <div className="flex justify-between items-end border-t border-black pt-10">
              <span className="text-[120px] font-black italic leading-none tracking-tighter">COLLECTION</span>
              <span className="text-[12px] font-black uppercase tracking-[1em] mb-4">Curator // 2026</span>
           </div>
        </div>
      </div>
    </main>
  );
}
