import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

const verifySchema = z.object({
  email: z.string().email(),
  token: z.string().min(6, "Token too short").max(8, "Token too long"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = verifySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, token } = result.data;
    const supabase = await createServerSupabase();

    // Verify OTP via Supabase
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.toLowerCase(),
      token: token,
      type: 'email'
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message || "Invalid or expired verification code." },
        { status: 401 }
      );
    }

    // 1. Activate User in Prisma (mark as verified)
    const user = await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: { 
        emailVerified: new Date(),
        // Sync name/image if available from Supabase metadata
        name: data.user.user_metadata.full_name || undefined,
        image: data.user.user_metadata.avatar_url || undefined,
      },
    });

    // 2. Create Custom JWT Session for our app
    await createSession(user.id);

    return NextResponse.json(
      { message: "Verification successful! Welcome to StepUP." },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
