import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, getSession } from "@/lib/auth";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase/server";

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = resetPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { password } = result.data;
    
    // 1. Get user from Supabase Session (they are logged in via the recovery link)
    const supabase = await createServerSupabase();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("[RESET_PWD_AUTH_ERROR]:", authError);
      return NextResponse.json(
        { error: "Unauthorized. Please use the reset link from your email." },
        { status: 401 }
      );
    }

    // 2. Update password in Prisma
    const hashedPassword = await hashPassword(password);
    await prisma.user.update({
      where: { email: user.email?.toLowerCase() },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Password synchronized successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset Password Sync Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
