import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { createSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // if "next" is in search params, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createServerSupabase()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error("[AUTH CALLBACK ERROR] exchangeCodeForSession failed:", error.message, error.name, error.status);
    }

    if (!error && data.user) {
      const { user } = data
      
      console.log("[AUTH CALLBACK] Supabase User Data:", {
        email: user.email,
        metadata: user.user_metadata
      });

      // Sync with Prisma User Table
      let localUser = await prisma.user.findUnique({
        where: { email: user.email?.toLowerCase() },
      })

      const fullName = user.user_metadata.full_name || user.user_metadata.name || user.email?.split('@')[0];
      const avatarUrl = user.user_metadata.avatar_url || user.user_metadata.picture;

      if (!localUser) {
        console.log("[AUTH CALLBACK] Creating new user for:", user.email);
        localUser = await prisma.user.create({
          data: {
            email: user.email!.toLowerCase(),
            name: fullName,
            image: avatarUrl,
            emailVerified: new Date(),
            role: "USER"
          }
        })
      } else {
        console.log("[AUTH CALLBACK] Updating existing user:", localUser.email);
        // Update name and image if they are missing or if we want to sync them from Google
        localUser = await prisma.user.update({
          where: { id: localUser.id },
          data: {
            name: localUser.name || fullName,
            image: localUser.image || avatarUrl,
            emailVerified: localUser.emailVerified || new Date(),
          }
        })
      }

      // Create our own custom JWT session if needed for consistency 
      // with the existing manual auth system
      await createSession(localUser.id)

      console.log("[AUTH CALLBACK] Session created for ID:", localUser.id);
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
