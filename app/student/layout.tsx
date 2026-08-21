"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Settings,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useAuth } from "@/features/auth/hooks/use-auth"

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
    dashboard: true,
  },
  {
    label: "Settings",
    href: "/student/settings",
    icon: Settings,
    dashboard: false,
  },
] as const

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/")
}

/* -------------------------------------------------------------------------- */
/*                                  TOP NAV                                   */
/* -------------------------------------------------------------------------- */

function TopNavStudent() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 hidden border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80 md:block">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-3 items-center px-6">
        {/* Left: Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            <GraduationCap className="h-4.5 w-4.5" />
          </div>

          <span className="text-base font-semibold">
            Progress Tracker
          </span>
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center justify-center gap-1.5">
          {NAV_ITEMS.map(
            ({ label, href, icon: Icon, dashboard }) => {
              const isActive = isActivePath(pathname, href)

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group flex items-center gap-2 transition-all duration-200",
                    dashboard
                      ? "rounded-xl px-5 py-2.5"
                      : "rounded-full px-4 py-2",
                    dashboard
                      ? isActive
                        ? "bg-foreground text-background shadow-sm"
                        : "bg-muted/50 text-foreground hover:bg-muted"
                      : isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      dashboard && isActive
                        ? "text-background"
                        : isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                    )}
                    fill={
                      dashboard && isActive
                        ? "currentColor"
                        : "none"
                    }
                    strokeWidth={isActive ? 1.7 : 2}
                  />

                  <span
                    className={cn(
                      "text-[15px]",
                      isActive
                        ? "font-semibold"
                        : "font-medium",
                    )}
                  >
                    {label}
                  </span>
                </Link>
              )
            },
          )}
        </nav>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*                                MOBILE NAV                                  */
/* -------------------------------------------------------------------------- */

function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 md:hidden",
        "border-t bg-background/95 backdrop-blur",
        "supports-[backdrop-filter]:bg-background/80",
        "shadow-[0_-1px_8px_rgba(0,0,0,0.04)]",
        "pb-[env(safe-area-inset-bottom)]",
      )}
    >
      <div className="flex h-16 items-center justify-around px-3">
        {NAV_ITEMS.map(
          ({ label, href, icon: Icon, dashboard }) => {
            const isActive = isActivePath(pathname, href)

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex flex-1 flex-col items-center justify-center",
                  "gap-1 py-2 active:scale-90",
                  "transition-transform duration-150",
                )}
              >
                {dashboard ? (
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full",
                      "transition-all duration-200",
                      isActive
                        ? "bg-foreground text-background shadow-md"
                        : "bg-muted text-foreground",
                    )}
                  >
                    <Icon
                      className="h-5.5 w-5.5"
                      fill={
                        isActive
                          ? "currentColor"
                          : "none"
                      }
                      strokeWidth={1.7}
                    />
                  </span>
                ) : (
                  <span
                    className={cn(
                      "absolute top-1 h-7 w-11 rounded-full",
                      "bg-foreground/[0.06]",
                      "transition-all duration-200",
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-75 opacity-0",
                    )}
                  >
                    <span className="sr-only">
                      Active
                    </span>
                  </span>
                )}

                {!dashboard && (
                  <Icon
                    className={cn(
                      "relative h-6 w-6 transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                    strokeWidth={isActive ? 1.7 : 2}
                  />
                )}

                <span
                  className={cn(
                    "relative text-[11px] leading-none transition-colors",
                    isActive
                      ? "font-semibold text-foreground"
                      : "font-medium text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </Link>
            )
          },
        )}
      </div>
    </nav>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  LAYOUT                                    */
/* -------------------------------------------------------------------------- */

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isChecking } = useAuth("user")

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <TopNavStudent />
      <BottomNav />

      <main className="pb-16 md:pb-0">
        <div className="mx-auto max-w-7xl px-6 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}