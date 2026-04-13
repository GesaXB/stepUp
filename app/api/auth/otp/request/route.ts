import { NextResponse } from "next/server";
import { z } from "zod";
import { createVerificationToken } from "@/lib/tokens";
import { sendOTPEmail } from "@/lib/email";

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

    // 1. Create token in DB
    const verificationToken = await createVerificationToken(email.toLowerCase());

    // 2. Send Email via Resend
    const { success, error } = await sendOTPEmail(
      verificationToken.email,
      verificationToken.token
    );

    if (!success) {
      return NextResponse.json(
        { error: "Protocol Failure: Communication link could not be established." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Access code transmitted to the designated terminal." },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP Request Error:", error);
    return NextResponse.json(
      { error: "System Breach: Internal processing failure." },
      { status: 500 }
    );
  }
}
