"use client";

import { SlidersHorizontal, Loader2, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FilterSidebar from "@/components/products/filter-sidebar";
import MobileFilterDrawer from "@/components/products/mobile-filter-drawer";
import ProductsHeader from "@/components/products/products-header";
import ProductGrid from "@/components/products/product-grid";
import { PRODUCTS, PRODUCT_FILTERS } from "@/lib/products";

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?type=${activeFilter}`);
        const data = await res.json();
        if (data.products) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeFilter]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  const filteredProducts = products;

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white flex flex-col">
      <main className="flex-1 pt-[100px] md:pt-[140px] pb-24 md:pb-32">
        <ProductsHeader 
          title="All" 
          subtitle="Products" 
          badge="Database" 
          badgeNumber="01" 
          resultCount={filteredProducts.length} 
        />

        <div className="px-6 md:px-16 max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
           <FilterSidebar 
             filters={PRODUCT_FILTERS} 
             activeFilter={activeFilter} 
             setActiveFilter={setActiveFilter} 
           />

           {/* Mobile Filter Toggle */}
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="lg:hidden w-full flex justify-between items-center border-b border-black/10 pb-4 mb-2"
           >
              <span className="text-[12px] font-black uppercase tracking-widest italic text-zinc-400">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Result' : 'Results'}
              </span>
              <button 
                onClick={() => setIsMobileFilterOpen(true)} 
                className="flex items-center gap-2.5 px-5 py-2.5 bg-black text-white active:scale-95 transition-transform"
                aria-label="Open filter settings"
              >
                 <SlidersHorizontal size={13} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
              </button>
           </motion.div>

           {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="animate-spin text-black" size={40} />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] italic animate-pulse">Fetching Sneakers...</p>
             </div>
           ) : filteredProducts.length === 0 ? (
             <div className="flex-1 flex flex-col items-center justify-center py-32 space-y-6">
                <div className="w-16 h-16 bg-zinc-50 flex items-center justify-center rounded-full border border-black/5">
                   <Package size={24} className="text-zinc-300" />
                </div>
                <div className="text-center space-y-2">
                   <p className="text-xl font-black italic uppercase tracking-tighter">No Sneakers Found.</p>
                   <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest italic">Check back later for new arrivals.</p>
                </div>
             </div>
           ) : (
             <ProductGrid filteredProducts={filteredProducts} />
           )}
        </div>
      </main>

      <MobileFilterDrawer 
        isOpen={isMobileFilterOpen} 
        setIsOpen={setIsMobileFilterOpen} 
        filters={PRODUCT_FILTERS}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    </div>
  );
}
