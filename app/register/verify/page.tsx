"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Mail, RefreshCw } from "lucide-react";

function VerifyOTPContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("CODE MUST BE 6 DIGITS.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token: otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    setResendSuccess(false);

    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to resend code");
      
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8 pt-[150px]">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-12"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 opacity-40">
            <span className="text-[10px] font-black tracking-widest uppercase italic">Verification Phase</span>
            <div className="w-12 h-px bg-black" />
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.9]">
            Secure <br /> <span className="text-zinc-200">Access.</span>
          </h1>
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
            Transmission sent to <span className="text-black">{email}</span>. <br /> Enter the 6-digit credential below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-4 bg-red-50 border-l-2 border-red-500 text-red-600 text-[10px] font-black uppercase tracking-widest italic">
              {error}
            </div>
          )}

          {resendSuccess && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }} 
              animate={{ opacity: 1, height: "auto", y: 0 }}
              className="p-4 bg-zinc-50 border border-black/5 flex items-center gap-3"
            >
              <Mail size={14} className="text-black" />
              <span className="text-[10px] font-black uppercase tracking-widest italic text-black">
                ACCESS CODE RE-TRANSMITTED. CHECK YOUR NODE.
              </span>
            </motion.div>
          )}

          {success && (
            <div className="p-4 bg-black text-white text-[10px] font-black uppercase tracking-widest italic">
              IDENTITY VERIFIED. ACCESS GRANTED.
            </div>
          )}

          <div className="space-y-4 group">
            <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">Code Sequence</label>
            <input 
              type="text" 
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000 000"
              className="w-full border-b-2 border-zinc-100 py-6 outline-none focus:border-black transition-all text-4xl font-black italic placeholder:text-zinc-100 tracking-[0.5em] text-center"
            />
          </div>

          <div className="space-y-6">
            <button 
              disabled={loading || success}
              className="w-full bg-black text-white py-6 flex items-center justify-center gap-5 group overflow-hidden relative active:scale-[0.98] transition-transform shadow-xl disabled:opacity-50"
            >
               <span className="text-[12px] font-black uppercase tracking-[0.3em] italic relative z-10 transition-transform duration-500">
                 {loading ? "Verifying..." : "Grant Access"}
               </span>
               <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
            </button>

            <div className="flex flex-col items-center gap-4 text-center">
              <button 
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-[11px] font-black uppercase italic tracking-widest border-b-2 border-transparent hover:border-black pb-1 transition-all flex items-center gap-2"
              >
                <RefreshCw size={12} className={resending ? "animate-spin" : ""} />
                {resending ? "Re-transmitting..." : "Resend Credentials"}
              </button>
              <span className="text-zinc-300 text-[9px] font-black uppercase tracking-widest">Protocol V.02-SEC</span>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Loading Identity Node...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}
