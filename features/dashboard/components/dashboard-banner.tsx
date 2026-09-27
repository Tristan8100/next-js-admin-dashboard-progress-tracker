
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface DashboardBannerProps {
  logo?: string;
  badge: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export default function DashboardBanner({
  logo = "https://sdoleyte.depedleytedivision.com/gallery/asset_6a7eaddd000075.45307218.png",
  badge,
  title,
  description,
  actionHref,
  actionLabel,
}: DashboardBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border-2 border-border bg-primary px-6 py-8 text-primary-foreground shadow-playful-lg sm:px-9 sm:py-10">
      {/* Decorative circles */}
      <div
        className="absolute -right-8 -top-10 size-40 rounded-full bg-secondary/90"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 right-24 size-32 rounded-full border-[18px] border-card/15"
        aria-hidden="true"
      />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        {/* Left: Content */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.16em]">
            <Sparkles className="size-3.5" />
            {badge}
          </p>

          <h1 className="font-display mt-5 max-w-2xl text-balance text-4xl tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-3 max-w-xl text-base leading-7 text-primary-foreground/85 sm:text-lg">
            {description}
          </p>

        {/* Action button */}
          {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="mt-6 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-card px-5 text-sm font-extrabold text-navy shadow-playful transition-colors hover:bg-secondary"
          >
            {actionLabel}
            <ArrowRight className="size-4" />
          </Link>
        )}
        </div>

        {/* Right: DepEd Logo */}
        <div className="hidden items-center justify-center lg:flex lg:w-64 xl:w-72">
          <img
            src={logo}
            alt="DepEd Logo"
            className="h-auto w-full max-w-[280px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}