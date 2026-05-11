import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase/server";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
  email: z.string().email("Invalid email format").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Validate input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // 2. Parallel processing: Start hashing while checking database
    // Optimization: Bcrypt is the bottleneck, so we gain time by doing it in parallel with the DB check
    const [hashedPassword, existingUser] = await Promise.all([
      hashPassword(password),
      prisma.user.findUnique({ 
        where: { email }, 
        select: { id: true } 
      })
    ]);

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already registered in our system." },
        { status: 409 }
      );
    }

    // 3. Create user in Prisma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
        emailVerified: null,
      },
    });

    // 4. Sign up via Supabase (Async integration)
    const supabase = await createServerSupabase();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
      }
    });

    if (signUpError) {
      console.error("[SUPABASE_SIGNUP_ERROR]:", signUpError);
      // We return 201 because the user IS created in our DB, but email might have failed
      return NextResponse.json(
        { 
          message: `Account created but failed to send verification email: ${signUpError.message}`,
          userId: user.id,
          email: user.email,
        },
        { status: 201 } 
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: "Registration successful! Verification protocol initiated.", 
        userId: user.id,
        email: user.email 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Critical Registration Error:", error);
    return NextResponse.json(
      { error: "An unexpected system error occurred. Please try again." },
      { status: 500 }
    );
  }
}
