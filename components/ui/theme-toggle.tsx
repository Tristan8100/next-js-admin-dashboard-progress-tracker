"use client"

import React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  // Render both icons but let CSS handle visibility to avoid
  // hydration mismatches between server and client.
  function handleClick() {
    // Fallback: if resolvedTheme is undefined, toggle based on document
    const current = resolvedTheme ?? (typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light")
    setTheme(current === "dark" ? "light" : "dark")
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleClick}
      aria-label="Toggle theme"
      className={className}
    >
      <Sun className="size-4 hidden dark:inline-block" />
      <Moon className="size-4 inline-block dark:hidden" />
    </Button>
  )
}
