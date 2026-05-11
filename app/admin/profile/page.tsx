"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  User, Camera, Shield, Mail, Lock, 
  ChevronRight, Save, Loader2, AlertCircle
} from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase/client";

export default function AdminProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const supabase = typeof window !== "undefined" ? createBrowserSupabase() : null;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          setEditName(data.user.name || "");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (updates: { name?: string; image?: string }) => {
    setUpdating(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ ...user, ...data.user });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error(data.error || "Update failed");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !supabase) return;

    setUpdating(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await handleUpdateProfile({ image: publicUrl });
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload image. Ensure 'avatars' bucket exists.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-black" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-4xl">
      <div className="space-y-4">
        <div className="flex items-center gap-4 opacity-40">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Account Settings</span>
          <div className="w-12 h-px bg-black" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.8]">
          Admin <br /> <span className="text-zinc-200">Profile.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Avatar Section */}
        <div className="lg:col-span-4 flex flex-col items-center gap-6">
          <div className="relative group">
            <div className="w-48 h-48 bg-white border border-black/5 overflow-hidden shadow-[20px_20px_0px_rgba(0,0,0,0.05)] relative group-hover:scale-[1.02] transition-transform duration-500">
              {user?.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-100">
                  <User size={80} />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white text-black p-4 rounded-full hover:scale-110 active:scale-95 transition-all"
                 >
                   <Camera size={24} />
                 </button>
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>
          <div className="text-center space-y-1">
             <p className="text-[10px] font-black uppercase tracking-widest italic">{user?.role} ACCESS</p>
             <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">USER ID: {user?.id.slice(0, 8)}...</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white border border-black p-8 md:p-10 shadow-[30px_30px_0px_rgba(0,0,0,0.02)] space-y-8">
             <div className="space-y-6">
                <div className="space-y-2 group">
                   <label className="text-[9px] font-black uppercase tracking-widest text-zinc-300 group-focus-within:text-black transition-colors italic">Full Name</label>
                   <div className="relative">
                      <input 
                        type="text" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full border-b-[1.5px] border-zinc-100 py-4 outline-none focus:border-black transition-all text-xl font-black italic uppercase tracking-tighter bg-transparent"
                      />
                   </div>
                </div>

                <div className="space-y-2 opacity-50 cursor-not-allowed">
                   <label className="text-[9px] font-black uppercase tracking-widest text-zinc-300 italic">Registered Email</label>
                   <div className="flex items-center gap-4 py-4 border-b-[1.5px] border-zinc-100">
                      <Mail size={16} className="text-zinc-300" />
                      <span className="text-sm font-black italic uppercase tracking-widest">{user?.email}</span>
                   </div>
                </div>
             </div>

             {error && (
               <div className="bg-red-50 border-l-2 border-red-500 p-4 flex items-center gap-4">
                  <AlertCircle size={16} className="text-red-500" />
                  <p className="text-[10px] font-black text-red-600 uppercase italic tracking-widest">{error}</p>
               </div>
             )}

             {success && (
               <div className="bg-black text-white p-4 flex items-center gap-4">
                  <Shield size={16} className="text-white" />
                  <p className="text-[10px] font-black uppercase italic tracking-widest">Profile updated successfully.</p>
               </div>
             )}

             <button 
                onClick={() => handleUpdateProfile({ name: editName })}
                disabled={updating || editName === user?.name}
                className="w-full bg-black text-white py-5 flex items-center justify-center gap-4 group disabled:opacity-20 transition-all active:scale-[0.98]"
             >
                {updating ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <span className="text-[12px] font-black uppercase tracking-[0.3em] italic">Save Changes</span>
                    <Save size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 bg-zinc-50 border border-zinc-200 space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
                      <Shield size={14} />
                   </div>
                   <h4 className="text-[11px] font-black uppercase tracking-widest italic">Two-Factor Auth</h4>
                </div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase leading-relaxed tracking-widest">Extra security layer for administrative operations.</p>
                <button className="text-[9px] font-black uppercase underline tracking-widest hover:text-zinc-500">Enable Beta</button>
             </div>

             <div className="p-6 bg-zinc-50 border border-zinc-200 space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-zinc-100 text-black flex items-center justify-center">
                      <Lock size={14} />
                   </div>
                   <h4 className="text-[11px] font-black uppercase tracking-widest italic">Access Logs</h4>
                </div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase leading-relaxed tracking-widest">Monitor recent administrative session activity.</p>
                <button className="text-[9px] font-black uppercase underline tracking-widest hover:text-zinc-500">View Log Table</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
