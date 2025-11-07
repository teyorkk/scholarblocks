import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message ?? 'Server error' }, { status: 500 })
  }
}
