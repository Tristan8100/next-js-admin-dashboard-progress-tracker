"use client";

import Link from "next/link";
import { LogOut, Settings } from "lucide-react";

import { useLogout } from "../hooks/use-logout";

interface AccountMenuProps {
  settingsHref: string;
  mobile?: boolean;
}

export function AccountMenu({
  settingsHref,
  mobile = false,
}: AccountMenuProps) {
  const { logout } = useLogout();

  return (
    <details
      className={
        mobile
          ? "group relative flex-1"
          : "group relative"
      }
    >
      <summary
        aria-label="Account menu"
        className={
          mobile
            ? "relative flex flex-1 cursor-pointer list-none flex-col items-center justify-center gap-1 py-2 text-muted-foreground transition-colors [&::-webkit-details-marker]:hidden"
            : "flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground [&::-webkit-details-marker]:hidden"
        }
      >
        <Settings className={mobile ? "h-6 w-6" : "h-4.5 w-4.5"} />
        {mobile && <span className="text-[11px] leading-none">Settings</span>}
      </summary>

      <div
        className={
          mobile
            ? "absolute bottom-16 right-0 z-50 w-40 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md"
            : "absolute right-0 top-11 z-50 w-40 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md"
        }
      >
        <Link
          href={settingsHref}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted"
        >
          <Settings className="size-4" />
          Settings
        </Link>

        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-destructive outline-none transition-colors hover:bg-destructive/10"
        >
          <LogOut className="size-4" />
          Log out
        </button>
      </div>
    </details>
  );
}
