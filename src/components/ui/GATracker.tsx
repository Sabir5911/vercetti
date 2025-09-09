"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function GATracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-PEF7ZR5NLB", { page_path: pathname })
    }
  }, [pathname])

  return null
}
