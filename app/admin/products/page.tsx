"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, Search, Filter, MoreVertical, 
  Edit, Trash2, ExternalLink, Package,
  ChevronLeft, ChevronRight, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
        alert("Product deleted successfully.");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4 opacity-40">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Manage Products</span>
            <div className="w-12 h-px bg-black" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.8]">
            Product <br /> <span className="text-zinc-200">List.</span>
          </h1>
        </div>

        <Link 
          href="/admin/products/new"
          className="bg-black text-white px-8 py-4 flex items-center gap-4 group hover:scale-[1.02] active:scale-95 transition-all shadow-[10px_10px_0px_rgba(0,0,0,0.1)]"
        >
          <Plus size={20} />
          <span className="text-[12px] font-black uppercase tracking-widest italic">Add Product</span>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-black p-4 shadow-[15px_15px_0px_rgba(0,0,0,0.02)]">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" />
          <input 
            type="text"
            placeholder="SEARCH PRODUCTS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-50 border-none outline-none pl-12 pr-4 py-3 text-[11px] font-bold tracking-widest focus:bg-zinc-100 transition-all rounded-sm uppercase"
          />
        </div>
        
        <button className="flex items-center gap-3 px-6 py-3 border border-black/10 hover:bg-black hover:text-white transition-all text-[10px] font-black uppercase tracking-widest italic">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white border border-black shadow-[20px_20px_0px_rgba(0,0,0,0.03)] overflow-x-auto">
        {loading ? (
          <div className="py-24 flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-black" size={40} />
            <p className="text-[10px] font-black uppercase tracking-widest italic animate-pulse">Loading Products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
             <Package size={48} className="mx-auto text-zinc-100" />
             <p className="text-[11px] font-black uppercase tracking-widest text-zinc-300 italic">No products found.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black text-[10px] font-black uppercase tracking-widest italic bg-zinc-50">
                <th className="px-6 py-5">Product Info</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Stock</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-zinc-100 border border-black/5 flex items-center justify-center overflow-hidden shrink-0">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <Package size={20} className="text-zinc-300" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link 
                          href={`/products/${product.sku}`}
                          target="_blank"
                          className="text-[12px] font-black uppercase truncate italic hover:underline hover:text-zinc-600 transition-colors block"
                        >
                          {product.name}
                        </Link>
                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">SKU: {product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-sm border ${
                      product.status === "IN_STOCK" ? "bg-green-50 border-green-200 text-green-600" :
                      product.status === "SOLD_OUT" ? "bg-red-50 border-red-200 text-red-600" :
                      "bg-amber-50 border-amber-200 text-amber-600"
                    }`}>
                      {product.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-[13px] font-black italic tracking-tighter">${parseFloat(product.price).toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-[11px] font-bold text-zinc-500 italic">
                      {product.variants?.reduce((acc: number, v: any) => acc + v.stock, 0) || 0} PCS
                    </p>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Link 
                        href={`/products/${product.sku}`}
                        target="_blank"
                        className="p-2 text-zinc-300 hover:text-black hover:bg-zinc-100 transition-all rounded-sm"
                       >
                         <ExternalLink size={16} />
                       </Link>
                       <Link 
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 text-zinc-300 hover:text-black hover:bg-zinc-100 transition-all rounded-sm"
                       >
                         <Edit size={16} />
                       </Link>
                       <button 
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={deletingId === product.id}
                        className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-sm disabled:opacity-50"
                       >
                         {deletingId === product.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-between px-2">
         <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest italic">Showing {filteredProducts.length} of {products.length} Products</p>
         <div className="flex gap-2">
            <button className="p-2 border border-black/10 hover:bg-black hover:text-white transition-all disabled:opacity-10" disabled>
               <ChevronLeft size={16} />
            </button>
            <button className="p-2 border border-black/10 hover:bg-black hover:text-white transition-all disabled:opacity-10" disabled>
               <ChevronRight size={16} />
            </button>
         </div>
      </div>
    </div>
  );
}
