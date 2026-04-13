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
      return { success: false, error };
    }

    console.log("[EMAIL_SYSTEM] Success:", data);
    return { success: true, data };
  } catch (error) {
    console.error("[EMAIL_CRITICAL_FAILURE]:", error);
    return { success: false, error };
  }
};
