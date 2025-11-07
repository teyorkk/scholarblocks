import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

// POST /api/auth/verify-otp { email, code, context }
// context: 'register' | 'forgot'
export async function POST(req: Request) {
  try {
    const { email, code, context } = await req.json()
    if (!email || !code || !context) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const supabase = getSupabaseServerClient()

    // Map to Supabase OTP verification types
    const type = context === 'register' ? 'signup' : 'email'

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: type as 'signup' | 'email',
    })
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, userId: data.user?.id })
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message ?? 'Server error' }, { status: 500 })
  }
}
