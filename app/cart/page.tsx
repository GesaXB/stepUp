"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MotionViewport from "@/components/ui/motion-viewport";
import { PRODUCTS } from "@/lib/products";
import { X, ArrowRight, ShieldCheck, Minus, Plus, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { getLocalCart, updateLocalCartQuantity, removeFromLocalCart, clearLocalCart } from "@/lib/cart";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  const fetchCartData = () => {
    setIsLoading(true);
    const localItems = getLocalCart();
    const mapped = localItems.map((item: any) => {
      const productDef = PRODUCTS.find(p => p.sku === item.sku);
      if (!productDef) return null;
      return {
        ...productDef,
        quantity: item.quantity,
        size: item.size
      };
    }).filter(Boolean);
    setCartItems(mapped);
    setIsLoading(false);
  };

  useEffect(() => {
    setMounted(true);
    fetchCartData();

    const handleUpdate = () => fetchCartData();
    window.addEventListener('cart-update', handleUpdate);
    return () => window.removeEventListener('cart-update', handleUpdate);
  }, []);

  const handleUpdateQuantity = (sku: string, size: string, delta: number) => {
    const item = cartItems.find(i => i.sku === sku && i.size === size);
    if (!item) return;
    const newQ = item.quantity + delta;
    updateLocalCartQuantity(sku, size, newQ);
  };

  const handleRemoveItem = (sku: string, size: string) => {
    removeFromLocalCart(sku, size);
  };

  const handleCheckout = async () => {
    setIsCheckingAuth(true);
    try {
      const res = await fetch("/api/auth/check");
      if (res.ok) {
        // Proceed to payment/checkout flow
        alert("Authentication verified. Proceeding to checkout...");
      } else {
        // Redirect to login only when explicitly trying to pay
        window.location.href = "/login?redirect=/cart";
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleClearCart = () => {
    clearLocalCart();
  };

  const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[^0-9]/g, ''));
  const subtotal = cartItems.reduce((acc, item) => acc + (parsePrice(item.price) * item.quantity), 0);
  const shipping = subtotal > 300 ? 0 : 25;
  const total = subtotal > 0 ? subtotal + shipping : 0;

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white flex flex-col overflow-x-hidden text-black font-sans relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
      
      <main className="flex-1 pt-[120px] md:pt-[150px] pb-24 md:pb-32 relative z-10">
        
        <section className="px-6 md:px-24 max-w-[1300px] mx-auto pb-12 md:pb-16 border-b border-black/10">
           <MotionViewport className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              <div className="space-y-6">
                 <div className="flex items-center gap-4 opacity-40">
                    <span className="w-12 h-px bg-black" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Requisition</span>
                 </div>
                 
                 <h1 className="text-6xl sm:text-[90px] lg:text-[110px] font-black uppercase italic tracking-tighter leading-[0.8] text-black">
                    Local <br />
                    <span className="text-zinc-300">Cart.</span>
                 </h1>
              </div>

              <div className="flex flex-col gap-2 md:text-right">
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 flex items-center md:justify-end gap-2">
                    <AlertCircle size={14} className="text-amber-500" /> Guest Mode Active
                 </span>
                 <p className="text-[12px] font-bold uppercase tracking-widest italic text-zinc-500">
                    {cartItems.length} {cartItems.length === 1 ? 'Artifact' : 'Artifacts'} in Storage
                 </p>
              </div>
           </MotionViewport>
        </section>

        <section className="px-6 md:px-24 max-w-[1300px] mx-auto pt-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
           <div className="col-span-1 lg:col-span-7 flex flex-col gap-8">
              {isLoading ? (
                <div className="py-24 flex justify-center items-center">
                  <Loader2 className="animate-spin text-zinc-300" size={32} />
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                   {cartItems.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="py-16 flex flex-col items-center text-center gap-6 border border-black/5 bg-zinc-50"
                      >
                         <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Cart Empty</span>
                         <h2 className="text-3xl font-black italic uppercase tracking-tighter">No Artifacts Selected.</h2>
                         <Link href="/products" className="bg-black text-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-colors mt-4">
                            Browse Collection
                         </Link>
                      </motion.div>
                   ) : (
                      cartItems.map((item) => (
                         <motion.div 
                           layout
                           initial={{ opacity: 0, scale: 0.98 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                           key={item.sku + item.size}
                           className="flex flex-col sm:flex-row gap-6 p-4 border border-black/10 bg-zinc-50/50 group"
                         >
                            <div className="w-full sm:w-[150px] aspect-square bg-white border border-black/5 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                               <Image src={item.image} alt={item.name} fill className="object-cover p-4 scale-95 group-hover:scale-105 transition-transform duration-700" />
                            </div>

                            <div className="flex flex-col justify-between flex-1 py-1">
                               <div className="flex justify-between items-start gap-4">
                                  <div className="space-y-2">
                                     <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400 bg-white border border-black/10 px-2 py-0.5 w-fit">
                                        {item.sku}
                                     </div>
                                     <Link href={`/products/${item.sku}`} className="block">
                                        <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none hover:text-zinc-500 transition-colors">
                                           {item.name}
                                        </h3>
                                     </Link>
                                     <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Size: EU {item.size}</p>
                                  </div>
                                  <button type="button" onClick={() => handleRemoveItem(item.sku, item.size)} className="text-zinc-300 hover:text-red-500 transition-colors" aria-label="Remove item">
                                     <X size={20} />
                                  </button>
                               </div>

                               <div className="flex justify-between items-end mt-6 sm:mt-0">
                                  <div className="flex items-center border border-black/20 bg-white">
                                     <button onClick={() => handleUpdateQuantity(item.sku, item.size, -1)} className="w-8 h-8 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                                        <Minus size={12} strokeWidth={3} />
                                     </button>
                                     <div className="w-8 h-8 flex items-center justify-center text-[12px] font-black border-x border-black/10">
                                        {item.quantity}
                                     </div>
                                     <button onClick={() => handleUpdateQuantity(item.sku, item.size, 1)} className="w-8 h-8 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                                        <Plus size={12} strokeWidth={3} />
                                     </button>
                                  </div>
                                  
                                  <span className="text-xl font-black italic tracking-tighter">
                                     ${parsePrice(item.price) * item.quantity}
                                  </span>
                               </div>
                            </div>
                         </motion.div>
                      ))
                   )}
                </AnimatePresence>
              )}
           </div>

           <div className="col-span-1 lg:col-span-5 relative">
              <div className="sticky top-32 p-8 border border-black bg-white shadow-2xl flex flex-col gap-8">
                 <div className="flex items-center justify-between border-b border-black/10 pb-6">
                    <h2 className="text-3xl font-black italic tracking-tighter uppercase">Summary</h2>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-black text-white px-2 py-1">HQ/01</span>
                 </div>

                 {cartItems.length > 0 && !isLoading ? (
                    <>
                       <div className="space-y-4 text-[12px] font-bold uppercase tracking-widest text-zinc-500 italic">
                          <div className="flex justify-between">
                             <span>Subtotal</span>
                             <span className="text-black">${subtotal}</span>
                          </div>
                          <div className="flex justify-between">
                             <span>Shipping</span>
                             <span className="text-black">{shipping === 0 ? 'COMPLIMENTARY' : `$${shipping}`}</span>
                          </div>
                       </div>

                       <div className="flex justify-between items-end border-t border-black pt-6">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black">Total Due</span>
                          <span className="text-5xl font-black italic tracking-tighter text-black leading-none">${total}</span>
                       </div>

                       <button 
                        onClick={handleCheckout}
                        disabled={isCheckingAuth}
                        className="w-full bg-black text-white py-5 text-[14px] font-black hover:bg-zinc-800 transition-all uppercase tracking-[0.2em] italic group flex items-center justify-center gap-4 relative overflow-hidden mt-4"
                       >
                          <span className="relative z-10 flex items-center gap-3">
                             {isCheckingAuth ? <Loader2 className="animate-spin" size={18} /> : (
                               <>
                                 Finalize Requisition
                                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                               </>
                             )}
                          </span>
                          <div className="absolute inset-0 bg-zinc-800 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                       </button>

                       <button 
                        onClick={handleClearCart}
                        className="w-full mt-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-red-500 transition-colors"
                       >
                          <Trash2 size={12} />
                          Clear Requisition
                       </button>

                       <div className="text-center pt-2">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 italic">
                             Log in required for secure payment protocol.
                          </p>
                       </div>
                    </>
                 ) : (
                    <div className="text-center py-8">
                       <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 italic">No operations available.</p>
                    </div>
                 )}
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
