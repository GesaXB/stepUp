import { Resend } from "resend";
import { OTPEmail } from "@/emails/otp-email";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email: string, otp: string) => {
  console.log(`[EMAIL_SYSTEM] Attempting to send OTP to: ${email}`);
  
  try {
    const { data, error } = await resend.emails.send({
      from: "StepUP <onboarding@resend.dev>",
      to: email,
      subject: "Your StepUP Access Code",
      react: React.createElement(OTPEmail, { otp }),
    });

    if (error) {
      console.error("[RESEND_ERROR]:", error);
      // In development, we don't want to block the user if Resend fails 
      // because of sandbox restrictions (403).
      console.log(`\n\n[DEVELOPMENT_MODE] >>> YOUR ACCESS CODE IS: ${otp} <<<\n\n`);
      return { success: false, error };
    }

    console.log("[EMAIL_SYSTEM] Success:", data);
    return { success: true, data };
  } catch (err) {
    console.error("[EMAIL_CRITICAL_FAILURE]:", err);
    // Fallback log for development
    console.log(`\n\n[DEVELOPMENT_MODE] >>> YOUR ACCESS CODE IS: ${otp} <<<\n\n`);
    return { success: false, error: err };
  }
};
