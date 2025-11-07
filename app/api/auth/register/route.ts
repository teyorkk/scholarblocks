import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

// POST /api/auth/register { name, email, password }
// Triggers Supabase signUp which will send an email confirmation (OTP or link based on project settings).
export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, userId: data.user?.id })
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message ?? "Server error" }, { status: 500 })
  }
}
