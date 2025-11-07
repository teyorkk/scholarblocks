'use client'

import { motion } from "framer-motion"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/components/session-provider"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { ready, user } = useSession()
  const hydrated = ready && typeof window !== 'undefined'

  useEffect(() => {
    if (!hydrated) return
    if (!user) {
      router.push('/login')
    }
  }, [hydrated, user, router])

  if (!hydrated || !user) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
