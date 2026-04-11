"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import FilterSidebar from "@/components/products/filter-sidebar";
import MobileFilterDrawer from "@/components/products/mobile-filter-drawer";
import ProductsHeader from "@/components/products/products-header";
import ProductGrid from "@/components/products/product-grid";

const PRODUCTS = [
  { name: "Air Max SU '26 Platinum", image: "/images/sneaker-yellow.png", price: "$240", sku: "SU-V1-AMX", status: "In Stock", type: "Core" },
  { name: "Leather Heritage Classic", image: "/images/story-sneaker.png", price: "$190", sku: "SU-V1-LHC", status: "Limited", type: "Heritage" },
  { name: "Tech Performance Onyx", image: "/images/sneaker-right.png", price: "$280", sku: "SU-V1-TPO", status: "Low Stock", type: "Performance" },
  { name: "Phantom Flow V2", image: "/images/hero-main.png", price: "$310", sku: "SU-V1-PF2", status: "In Stock", type: "Performance" },
  { name: "Urban Recon Protocol", image: "/images/story-model.png", price: "$420", sku: "SU-V1-URB", status: "Sold Out", type: "Limited" },
  { name: "Hypermesh 'Graphite'", image: "/images/sneaker-yellow.png", price: "$265", sku: "SU-V1-HCG", status: "Limited", type: "Core" },
];

const FILTERS = ["All Modules", "Core", "Performance", "Heritage", "Limited"];

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState("All Modules");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const filteredProducts = activeFilter === "All Modules" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.type === activeFilter);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-[120px] md:pt-[180px] pb-32">
        <ProductsHeader />

        <div className="px-6 md:px-16 max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
           <FilterSidebar 
             filters={FILTERS} 
             activeFilter={activeFilter} 
             setActiveFilter={setActiveFilter} 
           />

           {/* Mobile Filter Toggle */}
           <div className="lg:hidden w-full flex justify-between items-center border-b-[2px] border-black pb-4 mb-4">
              <span className="text-[14px] font-black uppercase tracking-widest italic">{filteredProducts.length} Results</span>
              <button 
                onClick={() => setIsMobileFilterOpen(true)} 
                className="flex items-center gap-2 border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
                aria-label="Open filter settings"
              >
                 <SlidersHorizontal size={14} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
              </button>
           </div>

           <ProductGrid filteredProducts={filteredProducts} />
        </div>
      </main>

      <Footer />

      <MobileFilterDrawer 
        isOpen={isMobileFilterOpen} 
        setIsOpen={setIsMobileFilterOpen} 
        filters={FILTERS}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    </div>
  );
}
