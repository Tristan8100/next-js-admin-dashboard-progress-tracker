"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, Users, BarChart3, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Students", href: "/teacher/students", icon: Users },
  { label: "Analytics", href: "/teacher/analytics", icon: BarChart3 },
  { label: "Settings", href: "/teacher/settings", icon: Settings },
] as const

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/")
}

function TopNav() {
  const pathname = usePathname()

  return (
    <header className="hidden md:block sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="mx-auto max-w-7xl h-16 px-6 grid grid-cols-3 items-center">
        {/* Left: brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            <GraduationCap className="h-4.5 w-4.5" />
          </div>
          <span className="font-semibold text-base">Progress Tracker</span>
        </div>

        {/* Center: nav items */}
        <nav className="flex items-center justify-center gap-2">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = isActivePath(pathname, href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group relative flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}
                  fill={isActive ? "currentColor" : "none"}
                  strokeWidth={isActive ? 1.5 : 2}
                />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right: spacer for balance (avatar/actions go here later) */}
        <div className="flex items-center justify-end">
          <div className="h-9 w-9 rounded-full bg-muted" aria-hidden />
        </div>
      </div>
    </header>
  )
}

function BottomNav() {
  const pathname = usePathname()

  return (
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
  )
}

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <TopNav />
      <BottomNav />
      <main className="pb-16 md:pb-0">
        <div className="mx-auto max-w-7xl px-6 py-6">{children}</div>
      </main>
    </div>
  )
}