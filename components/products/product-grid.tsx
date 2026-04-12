"use client";

import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/products/product-card";
import type { Product } from "@/lib/products";

interface ProductGridProps {
  filteredProducts: Product[];
}

export default function ProductGrid({ filteredProducts }: ProductGridProps) {
  return (
    <motion.div 
      layout
      className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12"
    >
      <AnimatePresence mode="popLayout">
         {filteredProducts.map(item => (
           <ProductCard key={item.sku} item={item} />
         ))}
      </AnimatePresence>
    </motion.div>
  );
}
