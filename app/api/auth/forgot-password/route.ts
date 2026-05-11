import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = forgotPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const supabase = await createServerSupabase();

    // Sends the reset link via Supabase
    const { error } = await supabase.auth.resetPasswordForEmail(email.toLowerCase(), {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password`,
    });

    if (error) {
      console.error("[SUPABASE_FORGOT_PWD_ERROR]:", error);
      
      if (error.status === 429) {
        return NextResponse.json(
          { error: "Slow down! You can only request a reset link once every 60 seconds." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: error.message || "Failed to send reset link." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Recovery link sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot Password Fatal Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
