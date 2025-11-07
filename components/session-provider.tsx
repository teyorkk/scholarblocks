"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Session, User } from "@supabase/supabase-js"

type SessionContextValue = {
  ready: boolean
  session: Session | null
  user: User | null
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()

    // Initial load
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null)
      setReady(true)
    })

    // Subscribe to auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })
    const unsub = () => sub.subscription.unsubscribe()

    return () => {
      unsub()
    }
  }, [])

  const value = useMemo<SessionContextValue>(() => ({
    ready,
    session,
    user: session?.user ?? null,
  }), [ready, session])

  if (!ready) return null
  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error("useSession must be used within SessionProvider")
  return ctx
}
