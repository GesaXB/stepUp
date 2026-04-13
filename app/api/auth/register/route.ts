import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
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

    // 2. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Protocol Error: Node already exists linked to this email." },
        { status: 409 }
      );
    }

    // 3. Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "USER", // Default role
      },
    });

    // 4. Initialize session
    await createSession(user.id);

    return NextResponse.json(
      { message: "Identity created successfully. Welcome to the Vault.", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration fatal error:", error);
    return NextResponse.json(
      { error: "Internal System Breach: Failed to process registry." },
      { status: 500 }
    );
  }
}
