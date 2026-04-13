import { prisma } from "./prisma";
import crypto from "crypto";

/**
 * Generates a random 6-digit OTP code.
 */
export function generateOTP(): string {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Creates or updates a verification token for a given email.
 * Each token is valid for 10 minutes.
 */
export async function createVerificationToken(email: string) {
  const token = generateOTP();
  // Valid for 10 minutes
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  // Clear existing tokens for this email to avoid clutter
  await prisma.verificationToken.deleteMany({
    where: { email },
  });

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
}

/**
 * Verifies if a token is valid for a given email.
 */
export async function verifyOTPToken(email: string, token: string) {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken || verificationToken.email !== email) {
    return { success: false, message: "Invalid token." };
  }

  const hasExpired = new Date() > verificationToken.expires;

  if (hasExpired) {
    await prisma.verificationToken.delete({ where: { id: verificationToken.id } });
    return { success: false, message: "Token has expired." };
  }

  // Delete token after successful verification
  await prisma.verificationToken.delete({ where: { id: verificationToken.id } });

  return { success: true };
}
