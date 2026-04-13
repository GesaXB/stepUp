import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { z } from "zod";
import { createVerificationToken } from "@/lib/tokens";
import { sendOTPEmail } from "@/lib/email";

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

    // 3. Hash password and create user (Unverified state)
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "USER",
        emailVerified: null, // Ensure it's null until OTP is verified
      },
    });

    // 4. Generate & Send OTP
    const verificationToken = await createVerificationToken(user.email);
    const { success: emailSent } = await sendOTPEmail(user.email, verificationToken.token);

    if (!emailSent) {
      // Cleanup user if email fails? For now just log it.
      console.error("Failed to send verification email to:", user.email);
    }

    return NextResponse.json(
      { 
        message: "Identity recorded. Verification code transmitted to your terminal.", 
        userId: user.id,
        email: user.email 
      },
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
