import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase/server";

const requestSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const supabase = await createServerSupabase();

    // Resend signup confirmation link via Supabase
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.toLowerCase(),
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
      }
    });

    if (error) {
      console.error("[SUPABASE_RESEND_ERROR]:", error);
      
      // Handle Rate Limit (429)
      if (error.status === 429) {
        return NextResponse.json(
          { error: "Slow down! You can only request a new link once every 60 seconds." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: error.message || "Failed to resend verification email." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Verification code sent to your email via Supabase." },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP Request Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
