import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_secret_for_dev_mode"
)

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value
  const { pathname } = request.nextUrl

  // Define route groups
  const isAuthRoute = pathname.startsWith("/login") || 
                      pathname.startsWith("/register")
  
  const isProtectedRoute = pathname.startsWith("/profile") || 
                           pathname.startsWith("/admin")
  
  const isAdminRoute = pathname.startsWith("/admin")

  // 1. If user is logged in and tries to access login/register, redirect based on role
  if (isAuthRoute && session) {
    try {
      const { payload } = await jwtVerify(session, SECRET)
      const target = payload.role === "ADMIN" ? "/admin" : "/profile"
      return NextResponse.redirect(new URL(target, request.url))
    } catch (e) {
      // Session invalid, let them proceed
    }
  }

  // 2. If user is NOT logged in and tries to access protected routes, redirect to login
  if (isProtectedRoute && !session) {
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // 3. Admin specific protection
  if (session) {
    try {
      const { payload } = await jwtVerify(session, SECRET)
      
      // If Admin tries to access regular user profile, redirect to admin dashboard
      if (pathname.startsWith("/profile") && payload.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url))
      }

      // Protection for /admin routes
      if (isAdminRoute && payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (e) {
      // Session invalid or expired
      const url = new URL("/login", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    "/login",
    "/register/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
}
