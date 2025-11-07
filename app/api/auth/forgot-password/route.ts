import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

// POST /api/auth/forgot-password { email }
// Sends an email OTP for authentication (no user creation). After verification, user can update password.
export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 })

    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    })
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message ?? 'Server error' }, { status: 500 })
  }
}
