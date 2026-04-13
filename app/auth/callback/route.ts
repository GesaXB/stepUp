import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { createSession } from '@/lib/auth'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // if "next" is in search params, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createServerSupabase()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      const { user } = data
      
      // Sync with Prisma User Table
      let localUser = await prisma.user.findUnique({
        where: { email: user.email?.toLowerCase() },
      })

      if (!localUser) {
        localUser = await prisma.user.create({
          data: {
            email: user.email!.toLowerCase(),
            name: user.user_metadata.full_name || user.email?.split('@')[0],
            image: user.user_metadata.avatar_url,
            emailVerified: new Date(),
            role: "USER"
          }
        })
      }

      // Create our own custom JWT session if needed for consistency 
      // with the existing manual auth system
      await createSession(localUser.id)

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
