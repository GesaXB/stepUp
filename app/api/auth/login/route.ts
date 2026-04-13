import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Validate
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Protocol Error: Invalid credentials format." },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // 2. Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Authentication Failed: Access key or Node ID mismatch." },
        { status: 401 }
      );
    }

    // 3. Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Authentication Failed: Access key or Node ID mismatch." },
        { status: 401 }
      );
    }

    // 4. Create Session
    await createSession(user.id);

    return NextResponse.json(
      { message: "Access granted. Welcome back.", role: user.role },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login fatal error:", error);
    return NextResponse.json(
      { error: "System Error: Failed to authorize access." },
      { status: 500 }
    );
  }
}
