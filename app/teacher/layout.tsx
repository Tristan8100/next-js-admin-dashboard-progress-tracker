"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Settings,
  Users,
  BarChart3,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/features/auth/hooks/use-auth"

const NAV_ITEMS = [
  {
    label: "Students",
    href: "/teacher/students",
    icon: Users,
    dashboard: false,
  },
  {
    label: "Dashboard",
    href: "/teacher/dashboard",
    icon: LayoutDashboard,
    dashboard: true,
  },
  {
    label: "Analytics",
    href: "/teacher/analytics",
    icon: BarChart3,
    dashboard: false,
  },
] as const

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/")
}

/* -------------------------------------------------------------------------- */
/*                                  TOP NAV                                   */
/* -------------------------------------------------------------------------- */

function TopNav() {
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
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      dashboard && isActive
                        ? "text-background"
                        : isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
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
                        : "font-medium"
                    )}
                  >
                    {label}
                  </span>
                </Link>
              )
            }
          )}
        </nav>

        {/* Right: Settings + Profile */}
        <div className="flex items-center justify-end gap-2">
          <Link
            href="/teacher/settings"
            aria-label="Settings"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full",
              "text-muted-foreground transition-all duration-200",
              "hover:bg-muted hover:text-foreground",
              isActivePath(pathname, "/teacher/settings") &&
                "bg-muted text-foreground"
            )}
          >
            <Settings className="h-4.5 w-4.5" />
          </Link>

          {/* Profile */}
          <button
            type="button"
            aria-label="Profile"
            className="h-9 w-9 rounded-full bg-muted transition-colors hover:bg-muted/80"
          />
        </div>
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
        "pb-[env(safe-area-inset-bottom)]"
      )}
    >
      <div className="relative flex h-16 items-center justify-around px-3">

        {/* Students */}
        <Link
          href="/teacher/students"
          className={cn(
            "relative flex flex-1 flex-col items-center justify-center",
            "gap-1 py-2 active:scale-90",
            "transition-transform duration-150"
          )}
        >
          <span
            aria-hidden
            className={cn(
              "absolute top-1 h-7 w-11 rounded-full",
              "bg-foreground/[0.06]",
              "transition-all duration-200",
              isActivePath(pathname, "/teacher/students")
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            )}
          />

          <Users
            className={cn(
              "relative h-6 w-6 transition-colors",
              isActivePath(pathname, "/teacher/students")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
            strokeWidth={
              isActivePath(pathname, "/teacher/students")
                ? 1.7
                : 2
            }
          />

          <span
            className={cn(
              "relative text-[11px] leading-none",
              isActivePath(pathname, "/teacher/students")
                ? "font-semibold text-foreground"
                : "font-medium text-muted-foreground"
            )}
          >
            Students
          </span>
        </Link>

        {/* Dashboard - Center */}
        <Link
          href="/teacher/dashboard"
          className={cn(
            "relative z-10 flex flex-1 flex-col items-center justify-center",
            "gap-1 py-2 active:scale-90",
            "transition-transform duration-150"
          )}
        >
          <span
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full",
              "transition-all duration-200",
              isActivePath(pathname, "/teacher/dashboard")
                ? "bg-foreground text-background shadow-md"
                : "bg-muted text-foreground"
            )}
          >
            <LayoutDashboard
              className="h-5.5 w-5.5"
              fill={
                isActivePath(pathname, "/teacher/dashboard")
                  ? "currentColor"
                  : "none"
              }
              strokeWidth={1.7}
            />
          </span>

          <span
            className={cn(
              "text-[11px] leading-none transition-colors",
              isActivePath(pathname, "/teacher/dashboard")
                ? "font-semibold text-foreground"
                : "font-medium text-muted-foreground"
            )}
          >
            Dashboard
          </span>
        </Link>

        {/* Analytics */}
        <Link
          href="/teacher/analytics"
          className={cn(
            "relative flex flex-1 flex-col items-center justify-center",
            "gap-1 py-2 active:scale-90",
            "transition-transform duration-150"
          )}
        >
          <span
            aria-hidden
            className={cn(
              "absolute top-1 h-7 w-11 rounded-full",
              "bg-foreground/[0.06]",
              "transition-all duration-200",
              isActivePath(pathname, "/teacher/analytics")
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            )}
          />

          <BarChart3
            className={cn(
              "relative h-6 w-6 transition-colors",
              isActivePath(pathname, "/teacher/analytics")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
            strokeWidth={
              isActivePath(pathname, "/teacher/analytics")
                ? 1.7
                : 2
            }
          />

          <span
            className={cn(
              "relative text-[11px] leading-none",
              isActivePath(pathname, "/teacher/analytics")
                ? "font-semibold text-foreground"
                : "font-medium text-muted-foreground"
            )}
          >
            Analytics
          </span>
        </Link>
      </div>
    </nav>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  LAYOUT                                    */
/* -------------------------------------------------------------------------- */

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {

  //will act as a middleware
  const { isChecking } = useAuth("admin")

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <TopNav />
      <BottomNav />

      <main className="pb-16 md:pb-0">
        <div className="mx-auto max-w-7xl px-6 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}