import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      // If session exists in cookie but user not found in DB (e.g. deleted)
      // Force delete the session cookie to prevent redirect loops
      const cookieStore = await cookies();
      if (cookieStore.get("session")) {
        const response = NextResponse.json({ user: null, message: "Session invalid" });
        response.cookies.delete("session");
        return response;
      }
      return NextResponse.json({ user: null });
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in /api/auth/me:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
