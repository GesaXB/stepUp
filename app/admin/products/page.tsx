"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ExternalLink,
  Loader2,
  Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 md:space-y-10">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 md:gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 opacity-30">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Inventory</span>
            <div className="w-8 h-px bg-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">Products.</h1>
        </div>
        
        <button className="w-full sm:w-auto bg-black text-white px-8 py-4 text-[11px] md:text-[12px] font-black uppercase tracking-widest italic flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-95">
           <Plus size={18} />
           Add Product
        </button>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-4 border border-black/5">
         <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or SKU..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border-none focus:ring-1 focus:ring-black text-[13px] font-medium"
            />
         </div>

         <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button className="w-full sm:w-auto border border-black/10 px-6 py-3 text-[11px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 hover:bg-zinc-50">
               <Filter size={14} />
               Filter
            </button>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic px-4 hidden sm:block">
               {filteredProducts.length} Results
            </div>
         </div>
      </div>

      {/* Product Table */}
      <div className="bg-white border border-black/5 overflow-hidden">
         {isLoading ? (
           <div className="py-32 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-zinc-200" size={40} />
              <p className="text-[10px] font-black uppercase tracking-widest italic text-zinc-300">Loading Products...</p>
           </div>
         ) : filteredProducts.length === 0 ? (
           <div className="py-32 flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-zinc-50 flex items-center justify-center border border-black/5">
                 <Package size={24} className="text-zinc-200" />
              </div>
              <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest italic">No products found.</p>
           </div>
         ) : (
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-black/5 bg-zinc-50/50">
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Product</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">SKU</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Status</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Price</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Stock</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 italic text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-black/5">
                    {filteredProducts.map((product) => (
                       <tr key={product.id} className="hover:bg-zinc-50 transition-colors group">
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-zinc-100 border border-black/5 flex-shrink-0 relative overflow-hidden p-1">
                                   {product.images?.[0] && (
                                     <Image src={product.images[0]} alt={product.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                   )}
                                </div>
                                <div>
                                   <p className="text-[14px] font-black italic uppercase leading-none">{product.name}</p>
                                   <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{product.category?.name || "Uncategorized"}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-5">
                             <span className="text-[11px] font-black uppercase bg-zinc-100 px-2 py-1 border border-black/5">{product.sku}</span>
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  product.status === 'IN_STOCK' ? 'bg-green-500' : 
                                  product.status === 'SOLD_OUT' ? 'bg-red-500' : 'bg-amber-500'
                                }`} />
                                <span className="text-[10px] font-black uppercase italic">{product.status.replace('_', ' ')}</span>
                             </div>
                          </td>
                          <td className="px-8 py-5 text-[14px] font-black">${product.price}</td>
                          <td className="px-8 py-5 text-[14px] font-bold text-zinc-500">
                             {product.variants?.reduce((acc: number, v: any) => acc + v.stock, 0) || 0}
                          </td>
                          <td className="px-8 py-5 text-right">
                             <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-black hover:text-white transition-colors" title="Edit">
                                   <Edit size={16} />
                                </button>
                                <button className="p-2 hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                                   <Trash2 size={16} />
                                </button>
                                <button className="p-2 hover:bg-zinc-200 transition-colors" title="View in Store">
                                   <ExternalLink size={16} />
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
         )}
      </div>
    </div>
  );
}
