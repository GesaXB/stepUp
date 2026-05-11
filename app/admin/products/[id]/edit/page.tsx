"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, Save, X, Plus, 
  Image as ImageIcon, Loader2, AlertCircle,
  Hash, DollarSign, Type, AlignLeft, Trash2
} from "lucide-react";
import Link from "next/link";

import { uploadProductImage } from "@/lib/upload";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    sku: "",
    categoryId: "",
    status: "IN_STOCK",
    type: "CORE",
    isNewDrop: false,
    isCollab: false,
    images: [] as string[],
    variants: [] as { id?: string; size: string; stock: string }[]
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        console.log("Fetching data for product ID:", id);
        const [catRes, prodRes] = await Promise.all([
          fetch("/api/categories"),
          fetch(`/api/admin/products/detail/${id}`)
        ]);
        
        const catData = await catRes.json();
        setCategories(catData.categories || []);

        const prodData = await prodRes.json();
        const product = prodData.product;
        
        if (product) {
          console.log("Product data found:", product);
          setFormData({
            name: product.name || "",
            slug: product.slug || "",
            description: product.description || "",
            price: product.price?.toString() || "",
            sku: product.sku || "",
            categoryId: product.categoryId || "",
            status: product.status || "IN_STOCK",
            type: product.type || "CORE",
            isNewDrop: product.isNewDrop || false,
            isCollab: product.isCollab || false,
            images: product.images || [],
            variants: product.variants?.map((v: any) => ({
              id: v.id,
              size: v.size,
              stock: v.stock.toString()
            })) || []
          });
        } else {
          console.error("No product found in response:", prodData);
        }
      } catch (err) {
        console.error("Error fetching product detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => uploadProductImage(file));
      const urls = await Promise.all(uploadPromises);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...urls]
      }));
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { size: "", stock: "0" }]
    });
  };

  const handleRemoveVariant = (index: number) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index)
    });
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    const newVariants = [...formData.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setFormData({ ...formData, variants: newVariants });
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${formData.name}"? This action cannot be undone.`)) return;
    
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/products");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/admin/products");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
// ... (loading UI)
    return (
      <div className="py-24 flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-black" size={40} />
        <p className="text-[10px] font-black uppercase tracking-widest italic animate-pulse">Loading Product Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-5xl">
      {/* Back & Title */}
      <div className="space-y-6">
        <Link 
          href="/admin/products"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>
        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.8]">
          Edit <br /> <span className="text-zinc-200">Product.</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white border border-black p-8 md:p-10 shadow-[30px_30px_0px_rgba(0,0,0,0.02)] space-y-10">
              {/* Basic Info */}
              <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                       <label className="text-[9px] font-black uppercase tracking-widest text-zinc-300 group-focus-within:text-black transition-colors italic">Product Name</label>
                       <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border-b-[1.5px] border-zinc-100 py-4 outline-none focus:border-black transition-all text-lg font-black italic uppercase tracking-tighter"
                       />
                    </div>
                    <div className="space-y-2 group">
                       <label className="text-[9px] font-black uppercase tracking-widest text-zinc-300 group-focus-within:text-black transition-colors italic">URL Slug</label>
                       <input 
                        type="text" 
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full border-b-[1.5px] border-zinc-100 py-4 outline-none focus:border-black transition-all text-lg font-black italic tracking-tighter text-zinc-400"
                       />
                    </div>
                 </div>

                 <div className="space-y-2 group">
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-300 group-focus-within:text-black transition-colors italic">Description</label>
                    <textarea 
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full border border-zinc-100 p-4 outline-none focus:border-black transition-all text-sm font-bold tracking-tight bg-zinc-50/50"
                    />
                 </div>
              </div>

              {/* Images */}
              <div className="pt-10 border-t border-black/5 space-y-8">
                 <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] italic">Product Images</h3>
                    <label className="cursor-pointer text-[9px] font-black uppercase tracking-widest text-black bg-zinc-100 hover:bg-black hover:text-white px-4 py-2 transition-all flex items-center gap-2">
                      {uploading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                      {uploading ? "Uploading..." : "Upload Images"}
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                    </label>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((url, index) => (
                      <div key={index} className="relative aspect-square bg-zinc-50 border border-black/5 group overflow-hidden">
                         <img src={url} alt="Product" className="w-full h-full object-cover" />
                         <button 
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-white text-black p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                         >
                           <X size={14} />
                         </button>
                      </div>
                    ))}
                    {formData.images.length === 0 && !uploading && (
                      <div className="col-span-full py-12 border-2 border-dashed border-zinc-100 flex flex-col items-center gap-3 text-zinc-300">
                         <ImageIcon size={32} />
                         <p className="text-[10px] font-black uppercase tracking-widest italic">No Images Uploaded</p>
                      </div>
                    )}
                    {uploading && (
                      <div className="aspect-square bg-zinc-50 border border-dashed border-zinc-200 flex items-center justify-center">
                         <Loader2 size={24} className="animate-spin text-zinc-200" />
                      </div>
                    )}
                 </div>
              </div>

              {/* Variants */}
              <div className="pt-10 border-t border-black/5 space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="space-y-1">
                       <h3 className="text-[11px] font-black uppercase tracking-[0.3em] italic">Sizes & Inventory</h3>
                       <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Define available sizes and their respective stock levels</p>
                    </div>
                    <button 
                      type="button"
                      onClick={handleAddVariant}
                      className="bg-black text-white px-4 py-2 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 hover:bg-zinc-800 transition-colors"
                    >
                      <Plus size={14} /> Add Size
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.variants.map((variant, index) => (
                      <div key={index} className="relative group bg-zinc-50/50 border border-zinc-100 p-5 transition-all hover:border-black/20 hover:bg-white shadow-sm hover:shadow-md">
                         <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 italic">US Size</label>
                               <input 
                                 type="text" 
                                 placeholder="e.g. 10.5"
                                 value={variant.size}
                                 onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                                 className="w-full bg-transparent border-b border-zinc-200 py-2 text-sm font-black outline-none focus:border-black transition-all"
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 italic">In Stock</label>
                               <input 
                                 type="number" 
                                 placeholder="0"
                                 value={variant.stock}
                                 onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                                 className="w-full bg-transparent border-b border-zinc-200 py-2 text-sm font-black outline-none focus:border-black transition-all"
                               />
                            </div>
                         </div>
                         
                         {formData.variants.length > 1 && (
                           <button 
                            type="button"
                            onClick={() => handleRemoveVariant(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-black/10 flex items-center justify-center text-zinc-300 hover:text-red-500 hover:border-red-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"
                           >
                             <X size={12} />
                           </button>
                         )}
                      </div>
                    ))}
                 </div>

                 {formData.variants.length === 0 && (
                    <div className="py-10 border-2 border-dashed border-zinc-100 flex flex-col items-center gap-3 text-zinc-300">
                       <Plus size={24} className="opacity-20" />
                       <p className="text-[9px] font-black uppercase tracking-[0.2em] italic">No size variants added yet.</p>
                       <button onClick={handleAddVariant} type="button" className="text-[9px] font-black uppercase tracking-widest text-black underline">Add first size</button>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* Right Column: Settings & Media */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white border border-black p-8 shadow-[20px_20px_0px_rgba(0,0,0,0.02)] space-y-8">
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-300 italic">Price ($)</label>
                    <div className="relative">
                       <DollarSign size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-400" />
                       <input 
                        type="number" 
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="0.00"
                        className="w-full border-b-[1.5px] border-zinc-100 pl-8 py-4 outline-none focus:border-black transition-all text-xl font-black italic tracking-tighter"
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-300 italic">SKU Number</label>
                    <div className="relative">
                       <Hash size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-400" />
                       <input 
                        type="text" 
                        required
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        placeholder="STP-001"
                        className="w-full border-b-[1.5px] border-zinc-100 pl-8 py-4 outline-none focus:border-black transition-all text-lg font-black italic uppercase tracking-tighter"
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-300 italic">Category</label>
                    <select 
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full border-b-[1.5px] border-zinc-100 py-4 outline-none focus:border-black transition-all text-[11px] font-black uppercase tracking-widest italic bg-transparent cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-300 italic">Availability Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full border-b-[1.5px] border-zinc-100 py-4 outline-none focus:border-black transition-all text-[11px] font-black uppercase tracking-widest italic bg-transparent cursor-pointer"
                    >
                      <option value="IN_STOCK">In Stock</option>
                      <option value="LOW_STOCK">Low Stock</option>
                      <option value="LIMITED">Limited Edition</option>
                      <option value="SOLD_OUT">Sold Out</option>
                    </select>
                 </div>
              </div>

              <div className="pt-8 border-t border-black/5 space-y-4">
                 <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest italic">Mark as New Drop</label>
                    <input 
                      type="checkbox" 
                      checked={formData.isNewDrop}
                      onChange={(e) => setFormData({ ...formData, isNewDrop: e.target.checked })}
                      className="w-5 h-5 accent-black"
                    />
                 </div>
                 <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest italic">Collab Edition</label>
                    <input 
                      type="checkbox" 
                      checked={formData.isCollab}
                      onChange={(e) => setFormData({ ...formData, isCollab: e.target.checked })}
                      className="w-5 h-5 accent-black"
                    />
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button"
                  onClick={handleDelete}
                  disabled={saving}
                  className="flex-1 bg-white text-red-500 border border-red-500 py-5 flex items-center justify-center gap-4 group hover:bg-red-500 hover:text-white transition-all active:scale-[0.98] shadow-lg shadow-red-500/5"
                >
                   <Trash2 size={18} />
                   <span className="text-[12px] font-black uppercase tracking-[0.3em] italic">Delete Product</span>
                </button>

                <button 
                  type="submit"
                  disabled={saving}
                  className="flex-[2] bg-black text-white py-5 flex items-center justify-center gap-4 group disabled:opacity-20 transition-all active:scale-[0.98] shadow-2xl shadow-black/20"
                >
                  {saving ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span className="text-[12px] font-black uppercase tracking-[0.3em] italic">Update Product</span>
                      <Save size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
           </div>
        </div>
      </form>
    </div>
  );
}
