"use client";

import { useState, useEffect } from "react";
import { 
  Plus, Search, Edit, Trash2, Loader2, X, Save, ChevronLeft, Tag
} from "lucide-react";
import Link from "next/link";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" });
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingCategory ? `/api/admin/categories/${editingCategory.id}` : "/api/admin/categories";
      const method = editingCategory ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchCategories();
        closeModal();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This may affect products in this category.")) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (cat: any = null) => {
    if (cat) {
      setEditingCategory(cat);
      setFormData({ name: cat.name, slug: cat.slug, description: cat.description || "" });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", slug: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4 opacity-40">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Product Structure</span>
            <div className="w-12 h-px bg-black" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.8]">
            Manage <br /> <span className="text-zinc-200">Categories.</span>
          </h1>
        </div>

        <button 
          onClick={() => openModal()}
          className="bg-black text-white px-8 py-4 flex items-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[10px_10px_0px_rgba(0,0,0,0.1)]"
        >
          <Plus size={20} />
          <span className="text-[12px] font-black uppercase tracking-widest italic">Add Category</span>
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-white border border-black shadow-[20px_20px_0px_rgba(0,0,0,0.03)]">
        {loading ? (
          <div className="py-24 flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-black" size={40} />
            <p className="text-[10px] font-black uppercase tracking-widest italic animate-pulse">Fetching Categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="py-24 text-center space-y-4">
             <Tag size={48} className="mx-auto text-zinc-100" />
             <p className="text-[11px] font-black uppercase tracking-widest text-zinc-300 italic">No categories found.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between p-6 hover:bg-zinc-50 transition-colors group">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                     <h3 className="text-sm font-black uppercase italic">{cat.name}</h3>
                     <span className="text-[8px] bg-zinc-100 px-1.5 py-0.5 font-bold uppercase tracking-widest">{cat.slug}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest line-clamp-1 max-w-md">
                    {cat.description || "No description provided."}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                   <button 
                    onClick={() => openModal(cat)} 
                    className="p-2 text-zinc-300 hover:text-black hover:bg-zinc-100 rounded-sm transition-all"
                   >
                     <Edit size={16} />
                   </button>
                   <button 
                    onClick={() => handleDelete(cat.id)} 
                    className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white border border-black p-8 w-full max-w-md shadow-[30px_30px_0px_rgba(0,0,0,0.1)]">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                  {editingCategory ? "Update" : "New"} Category
                </h2>
                <button onClick={closeModal} className="text-zinc-300 hover:text-black transition-colors">
                  <X size={20} />
                </button>
             </div>

             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase tracking-widest italic text-zinc-400">Category Name</label>
                   <input 
                    type="text" 
                    required
                    placeholder="e.g. Running Shoes"
                    value={formData.name}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      name: e.target.value, 
                      slug: e.target.value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") 
                    })}
                    className="w-full border-b border-zinc-100 py-3 outline-none focus:border-black font-black uppercase italic text-sm placeholder:text-zinc-100 transition-all"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase tracking-widest italic text-zinc-400">URL Slug</label>
                   <input 
                    type="text" 
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full border-b border-zinc-100 py-3 outline-none focus:border-black font-black italic text-sm text-zinc-400"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase tracking-widest italic text-zinc-400">Description</label>
                   <textarea 
                    placeholder="Brief details about this category..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-zinc-100 p-3 outline-none focus:border-black font-bold text-[12px] bg-zinc-50/50"
                    rows={3}
                   />
                </div>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="w-full bg-black text-white py-4 font-black uppercase italic tracking-widest text-[11px] flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 shadow-2xl shadow-black/10"
                >
                   {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                   {editingCategory ? "Update Category" : "Save Category"}
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
