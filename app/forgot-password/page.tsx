"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, ShieldAlert } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send reset link.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Visual Section */}
      <section className="hidden md:flex w-1/2 relative bg-zinc-50 overflow-hidden flex-col justify-center p-24 pt-[110px]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
        />
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 space-y-12"
        >
          <div className="space-y-4">
             <div className="flex items-center gap-4 opacity-40">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Security Protocol</span>
                <div className="w-12 h-px bg-black" />
             </div>
             <h2 className="text-[80px] font-black uppercase italic tracking-tighter leading-[0.85] text-black">
                Account <br />
                <span className="text-zinc-300">Recovery.</span>
              </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 max-w-md">
             <div className="flex items-start gap-5 p-8 bg-white border border-black/5 shadow-sm">
                <ShieldAlert size={24} className="text-black" />
                <div className="space-y-1">
                   <h4 className="text-[12px] font-black uppercase tracking-widest italic">Encrypted Link</h4>
                   <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-tight leading-relaxed">
                     We will send an encrypted reset link to your registered email address.
                   </p>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24 bg-white relative pt-[150px] md:pt-[150px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="mb-12 space-y-4 text-center md:text-left">
             <div className="flex items-center gap-4 opacity-40 mb-6 justify-center md:justify-start">
                <span className="text-[10px] font-black uppercase tracking-widest italic">Identity Verification</span>
                <div className="w-12 h-px bg-black" />
             </div>
             <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">
                Reset <br /> <span className="text-zinc-200">Password.</span>
             </h1>
          </div>

          {!success ? (
            <form className="space-y-8" onSubmit={handleSubmit}>
              {error && (
                <div className="p-4 bg-red-50 border-l-2 border-red-500 text-red-600 text-[10px] font-black uppercase tracking-widest italic">
                  {error}
                </div>
              )}

              <div className="space-y-2 group">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 group-focus-within:text-black transition-colors italic">Registered Email</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="NAME@SYSTEM.COM"
                  className="w-full border-b-2 border-zinc-100 py-4 outline-none focus:border-black transition-all text-[13px] font-black italic placeholder:text-zinc-200 tracking-widest"
                />
              </div>

              <div className="pt-6 space-y-4">
                <button 
                  disabled={loading}
                  className="w-full bg-black text-white py-6 flex items-center justify-center gap-5 group overflow-hidden relative active:scale-[0.98] transition-transform shadow-xl disabled:opacity-50"
                >
                   <span className="text-[12px] font-black uppercase tracking-[0.3em] italic relative z-10">Send Reset Link</span>
                   <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                </button>

                <div className="flex items-center justify-center gap-6 pt-4">
                   <Link href="/login" className="text-[11px] font-black uppercase italic tracking-widest border-b-2 border-black pb-1 hover:opacity-50 transition-all">
                      Back to Sign In
                   </Link>
                </div>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="p-8 bg-zinc-50 border border-black/5 flex flex-col items-center gap-6 text-center">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full">
                  <Mail size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-[12px] font-black uppercase tracking-widest italic font-bold">Inbox Dispatched</h4>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight leading-relaxed">
                    Check your email for the recovery link. It will expire in 1 hour.
                  </p>
                </div>
              </div>
              <Link 
                href="/login"
                className="w-full border-2 border-black py-6 flex items-center justify-center text-[12px] font-black uppercase tracking-[0.3em] italic hover:bg-black hover:text-white transition-all"
              >
                Return to Login
              </Link>
            </motion.div>
          )}

          <div className="mt-20 flex justify-between items-center opacity-20">
             <span className="text-[9px] font-black uppercase tracking-widest">Protocol 04</span>
             <div className="h-6 w-24 bg-black" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #000, #000 1px, transparent 1px, transparent 4px)', backgroundSize: '5px 100%' }} />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
