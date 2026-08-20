"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, Users, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Students", href: "/students", icon: Users },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
] as const

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/")
}

export function NavBar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop / tablet: top nav */}
      <nav className="hidden md:flex items-center gap-1 border-b bg-background px-4 py-2">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = isActivePath(pathname, href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Icon
                className="h-4 w-4"
                fill={isActive ? "currentColor" : "none"}
                strokeWidth={isActive ? 1.5 : 2}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile: bottom nav, TikTok/Instagram style */}
      <nav
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex md:hidden items-center justify-around",
          "border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
          "shadow-[0_-1px_8px_rgba(0,0,0,0.04)]",
          "pb-[env(safe-area-inset-bottom)]"
        )}
      >
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = isActivePath(pathname, href)
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 py-2.5 active:scale-90 transition-transform duration-150 ease-out"
            >
              {/* Active indicator pill */}
              <span
                aria-hidden
                className={cn(
                  "absolute top-1 h-7 w-11 rounded-full bg-foreground/[0.06] transition-all duration-200 ease-out",
                  isActive ? "scale-100 opacity-100" : "scale-75 opacity-0"
                )}
              />

              <Icon
                className={cn(
                  "relative h-6 w-6 transition-all duration-200 ease-out",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
                fill={isActive ? "currentColor" : "none"}
                strokeWidth={isActive ? 1.5 : 2}
              />
              <span
                className={cn(
                  "relative text-[11px] leading-none transition-colors duration-200",
                  isActive ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
                )}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}