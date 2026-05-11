"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, RefreshCw } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResend = async () => {
    if (resendTimer > 0) return;
    
    setResending(true);
    setError("");
    setResendSuccess(false);

    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 429) {
          setResendTimer(60);
        }
        throw new Error(data.error || "Failed to resend link.");
      }
      
      setResendSuccess(true);
      setResendTimer(60);
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
            <span className="text-[10px] font-black tracking-widest uppercase italic">Email Verification</span>
            <div className="w-12 h-px bg-black" />
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.9]">
            Check <br /> <span className="text-zinc-200">Inbox.</span>
          </h1>
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
            We've sent a verification link to <span className="text-black">{email}</span>. <br />
            Please check your inbox and click the link to activate your account.
          </p>
        </div>

        <div className="space-y-8">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-50 border-l-2 border-red-500 text-red-600 text-[10px] font-black uppercase tracking-widest italic"
            >
              {error}
            </motion.div>
          )}

          {resendSuccess && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }} 
              animate={{ opacity: 1, height: "auto", y: 0 }}
              className="p-4 bg-zinc-900 border border-black/5 flex items-center gap-3"
            >
              <Mail size={14} className="text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest italic text-white">
                NEW LINK SENT. PLEASE CHECK YOUR EMAIL.
              </span>
            </motion.div>
          )}

          <div className="p-8 bg-zinc-50 border border-black/5 flex flex-col items-center gap-6 text-center">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full">
              <Mail size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="text-[12px] font-black uppercase tracking-widest italic">Verification Link Sent</h4>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight leading-relaxed">
                The link will expire in 24 hours. If you don't see it, check your spam folder.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <button 
                type="button"
                onClick={handleResend}
                disabled={resending || resendTimer > 0}
                className="text-[11px] font-black uppercase italic tracking-widest border-b-2 border-transparent hover:border-black pb-1 transition-all flex items-center gap-2 disabled:opacity-30 disabled:border-transparent"
              >
                <RefreshCw size={12} className={resending ? "animate-spin" : ""} />
                {resending ? "Sending..." : resendTimer > 0 ? `Wait ${resendTimer}s` : "Didn't receive the email? Resend Link"}
              </button>
              <span className="text-zinc-300 text-[9px] font-black uppercase tracking-widest">StepUP Security V.03</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
