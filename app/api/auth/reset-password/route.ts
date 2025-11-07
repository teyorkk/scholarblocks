import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// POST /api/auth/reset-password { password }
// Requires an authenticated session (from verifying OTP). Updates the user's password then signs out.
export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    if (!password)
      return NextResponse.json({ error: "Missing password" }, { status: 400 });

    const supabase = getSupabaseServerClient();
    const {
      data: { user },
      error: sessionErr,
    } = await supabase.auth.getUser();
    if (sessionErr || !user) {
      return NextResponse.json(
        { error: "Not authenticated. Verify your email OTP first." },
        { status: 401 }
      );
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    // Optional: sign out to enforce re-login with new password
    await supabase.auth.signOut();
    return NextResponse.json({ success: true });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(
      { error: error.message ?? "Server error" },
      { status: 500 }
    );
  }
}
