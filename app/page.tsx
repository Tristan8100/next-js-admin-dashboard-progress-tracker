"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  LineChart,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background">
              <GraduationCap className="size-5" />
            </div>

            <span className="text-lg font-semibold">
              Science Venture
            </span>
          </div>

          <Link
            href="/auth/login"
            className="inline-flex h-9 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="size-4" />
              Interactive Science Learning
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Explore.
              <br />
              <span className="text-muted-foreground">
                Learn. Progress.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Science Venture is an interactive learning platform
              designed to help students explore science topics,
              complete activities, and track their learning progress
              along the way.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/auth/login"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-6 text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
              >
                Start Learning
                <ArrowRight className="size-4" />
              </Link>

              <a
                href="#about"
                className="inline-flex h-11 items-center justify-center rounded-xl border px-6 text-sm font-medium transition-colors hover:bg-muted"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x sm:grid-cols-4">
          <div className="px-6 py-8 text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Science Maps
            </p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-2xl font-bold">48+</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Learning Activities
            </p>
          </div>

          <div className="border-t px-6 py-8 text-center sm:border-t-0">
            <p className="text-2xl font-bold">350+</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Students
            </p>
          </div>

          <div className="border-t px-6 py-8 text-center sm:border-t-0">
            <p className="text-2xl font-bold">92%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Activities Completed
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              About Science Venture
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A learning journey built around progress.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Science Venture turns science learning into a structured
              journey. Students can move through different learning
              maps, complete lessons and activities, and see how far
              they have progressed.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Teachers can monitor student activity and use progress
              information to understand how their students are
              performing.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={<BookOpen className="size-5" />}
              title="Learning Maps"
              description="Organized science topics that guide students through their learning journey."
            />

            <FeatureCard
              icon={<Target className="size-5" />}
              title="Track Progress"
              description="Keep track of completed activities, levels, and scores."
            />

            <FeatureCard
              icon={<Brain className="size-5" />}
              title="Interactive Learning"
              description="Learning activities designed to make science more engaging."
            />

            <FeatureCard
              icon={<LineChart className="size-5" />}
              title="Student Analytics"
              description="Teachers can view student progress and learning performance."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Your science journey starts here.
            </h2>

            <p className="mt-4 text-muted-foreground">
              A simple progression from discovering topics to
              demonstrating what you have learned.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Step
              number="01"
              icon={<BookOpen className="size-5" />}
              title="Choose a Map"
              description="Explore available science maps and choose a topic to begin."
            />

            <Step
              number="02"
              icon={<Brain className="size-5" />}
              title="Complete Activities"
              description="Work through lessons, tutorials, and knowledge checks."
            />

            <Step
              number="03"
              icon={<Trophy className="size-5" />}
              title="Build Your Progress"
              description="Earn progress as you complete activities and improve your scores."
            />
          </div>
        </div>
      </section>

      {/* Student / Teacher */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-8">
            <div className="flex size-11 items-center justify-center rounded-xl bg-muted">
              <GraduationCap className="size-5" />
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              For Students
            </h3>

            <p className="mt-3 leading-7 text-muted-foreground">
              Explore science topics, complete learning activities,
              check your scores, and follow your own progress through
              each learning map.
            </p>

            <ul className="mt-6 space-y-3">
              <FeatureItem text="Explore science learning maps" />
              <FeatureItem text="Complete activities and levels" />
              <FeatureItem text="Track your progress" />
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-8">
            <div className="flex size-11 items-center justify-center rounded-xl bg-muted">
              <Users className="size-5" />
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              For Teachers
            </h3>

            <p className="mt-3 leading-7 text-muted-foreground">
              Manage students and gain a clearer view of their
              learning progress through organized student information
              and analytics.
            </p>

            <ul className="mt-6 space-y-3">
              <FeatureItem text="Manage student accounts" />
              <FeatureItem text="Monitor student progress" />
              <FeatureItem text="View learning analytics" />
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:py-24">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to start your science venture?
            </h2>

            <p className="mt-4 text-muted-foreground">
              Begin exploring, complete activities, and see your
              progress grow.
            </p>

            <Link
              href="/auth/login"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-6 text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
            >
              Get Started
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4" />
            <span>Science Venture</span>
          </div>

          <span>
            © 2026 Science Venture. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function Step({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-2xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
          {icon}
        </div>

        <span className="text-sm font-semibold text-muted-foreground">
          {number}
        </span>
      </div>

      <h3 className="mt-5 font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <CheckCircle2 className="size-4 text-muted-foreground" />
      <span>{text}</span>
    </li>
  );
}