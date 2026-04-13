import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyOTPToken } from "@/lib/tokens";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

const verifySchema = z.object({
  email: z.string().email(),
  token: z.string().length(6, "Token must be exactly 6 digits"),
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

    const verification = await verifyOTPToken(email.toLowerCase(), token);

    if (!verification.success) {
      return NextResponse.json(
        { error: `Identity Rejection: ${verification.message}` },
        { status: 401 }
      );
    }

    // 1. Activate User
    const user = await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: { emailVerified: new Date() },
    });

    // 2. Create Session
    await createSession(user.id);

    return NextResponse.json(
      { message: "Identity verified. Protocol access granted. Welcome to the Vault." },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return NextResponse.json(
      { error: "System Breach: Verification sequence interrupted." },
      { status: 500 }
    );
  }
}
