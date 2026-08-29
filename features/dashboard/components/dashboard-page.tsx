"use client";

import Link from "next/link";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Loader2,
  Sparkles,
  Users,
} from "lucide-react";

import { useDashboard } from "../hooks/use-dashboard";
import { useVerifyUser } from "@/features/users/hooks/user-verify-user";
import { getApiErrorMessage } from "@/lib/api-error";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: user, isLoading: userLoading, isError: userIsError, error: userError } = useVerifyUser();
  const { data: dashboard, isLoading: dashboardLoading, isError: dashboardIsError, error: dashboardError } = useDashboard();

  if (userLoading || dashboardLoading) {
    return <div className="flex min-h-[460px] items-center justify-center"><div className="grid size-16 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-playful"><Loader2 className="size-7 animate-spin" /></div></div>;
  }

  if (userIsError || dashboardIsError) {
    return <div className="mx-auto flex min-h-[460px] max-w-md flex-col items-center justify-center text-center"><div className="grid size-16 place-items-center rounded-3xl bg-destructive/10 text-destructive"><AlertCircle className="size-7" /></div><h1 className="font-display mt-5 text-2xl text-navy">We could not load the class map.</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">{getApiErrorMessage(userError ?? dashboardError)}</p></div>;
  }

  const summary = dashboard?.summary;
  const totalStudents = summary?.totalStudents ?? 0;
  const startedStudents = summary?.startedStudents ?? 0;
  const startedPercentage = totalStudents ? Math.round((startedStudents / totalStudents) * 100) : 0;
  const teacherName = user?.user_info.name ?? "Teacher";

  return (
    <div className="space-y-7 pb-6">
      <section className="relative overflow-hidden rounded-[2rem] border-2 border-border bg-primary px-6 py-8 text-primary-foreground shadow-playful-lg sm:px-9 sm:py-10">
        <div className="absolute -right-8 -top-10 size-40 rounded-full bg-secondary/90" aria-hidden="true" />
        <div className="absolute -bottom-16 right-24 size-32 rounded-full border-[18px] border-card/15" aria-hidden="true" />
        <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.16em]"><Sparkles className="size-3.5" /> Your classroom mission</p><h1 className="font-display mt-5 max-w-2xl text-balance text-4xl tracking-tight sm:text-5xl">Hello, {teacherName}! Let&apos;s make today count.</h1><p className="mt-3 max-w-xl text-base leading-7 text-primary-foreground/85 sm:text-lg">Every small discovery moves your class forward. Here is the latest view of their science adventure.</p></div>
          <Link href="/teacher/students" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-card px-5 text-sm font-extrabold text-navy shadow-playful transition-colors hover:bg-secondary">View students <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <section aria-labelledby="class-snapshot-heading">
        <div className="mb-4 flex items-end justify-between gap-4"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-ocean">Class snapshot</p><h2 id="class-snapshot-heading" className="font-display mt-1 text-3xl tracking-tight text-navy">Your learning crew</h2></div><p className="hidden text-sm font-bold text-muted-foreground sm:block">Updated with the latest discoveries</p></div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard title="Total students" value={totalStudents} description="Explorers on your roster" icon={<Users className="size-5" />} color="bg-primary text-primary-foreground" />
          <SummaryCard title="Mission starters" value={startedStudents} description={`${startedPercentage}% have begun exploring`} icon={<GraduationCap className="size-5" />} color="bg-secondary text-secondary-foreground" />
          <SummaryCard title="Active explorers" value={summary?.activeStudents ?? 0} description="Recently making progress" icon={<Activity className="size-5" />} color="bg-accent text-accent-foreground" />
          <SummaryCard title="Average completed" value={summary?.averageCompleted ?? 0} description="Discoveries per student" icon={<CheckCircle2 className="size-5" />} color="bg-leaf text-primary-foreground" />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <Card className="border-2 border-border bg-card shadow-playful"><CardHeader className="border-b border-border pb-5"><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ocean">Live from the map</p><CardTitle className="font-display mt-2 text-2xl text-navy">Recent discoveries</CardTitle><p className="mt-1 text-sm text-muted-foreground">The latest wins from your students.</p></div><div className="grid size-11 place-items-center rounded-2xl bg-aqua text-ocean"><Activity className="size-5" /></div></div></CardHeader><CardContent className="pt-2">
          {dashboard?.recentActivity?.length ? <div className="divide-y divide-border">{dashboard.recentActivity.map((activity, index) => <div key={`${activity.user_id}-${activity.rank}-${activity.type}-${activity.level ?? index}`} className="flex items-center gap-3 py-4 first:pt-3"><div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary font-mono text-sm font-extrabold text-secondary-foreground">{activity.rank}</div><div className="min-w-0 flex-1"><p className="truncate font-bold text-navy">{activity.student_name}</p><p className="mt-0.5 text-sm text-muted-foreground">{activity.map_name} <span aria-hidden="true">·</span> {formatActivityType(activity.type)}{activity.level !== undefined ? ` ${activity.level}` : ""}</p></div><div className="shrink-0 text-right">{activity.score !== undefined && <Badge className="rounded-lg bg-primary/10 text-primary hover:bg-primary/10">{activity.score} pts</Badge>}<p className="mt-1 text-xs font-bold text-muted-foreground">{formatDate(activity.date_acquired)}</p></div></div>)}</div> : <EmptyState text="No discoveries have been recorded yet." />}
        </CardContent></Card>

        <Card className="border-2 border-border bg-sunshine shadow-playful"><CardHeader><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-secondary-foreground/70">Fresh faces</p><CardTitle className="font-display mt-2 text-2xl text-secondary-foreground">New to the crew</CardTitle><p className="mt-1 text-sm text-secondary-foreground/75">Welcome your newest learners.</p></div><div className="grid size-11 place-items-center rounded-2xl bg-card/70 text-secondary-foreground"><Users className="size-5" /></div></div></CardHeader><CardContent>
          {dashboard?.recentStudents?.length ? <div className="space-y-2">{dashboard.recentStudents.map((student) => <Link key={student._id} href={`/teacher/students/${student._id}`} className="flex items-center gap-3 rounded-2xl bg-card/80 p-3 text-secondary-foreground shadow-sm hover:bg-card"><div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">{getInitials(student.name)}</div><div className="min-w-0 flex-1"><p className="truncate font-bold">{student.name}</p><p className="truncate text-xs text-secondary-foreground/70">{student.username ? `@${student.username}` : "New explorer"}</p></div><span className="text-xs font-extrabold">{student.gradeLevel !== undefined ? `Grade ${student.gradeLevel}` : "View"}</span></Link>)}</div> : <EmptyState text="New students will appear here." />}
        </CardContent></Card>
      </div>

      <Card className="border-2 border-border bg-card shadow-playful"><CardHeader className="border-b border-border pb-5"><div className="flex flex-wrap items-start justify-between gap-4"><div className="flex gap-3"><div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent/20 text-coral"><AlertCircle className="size-5" /></div><div><p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ocean">Teacher to-do</p><CardTitle className="font-display mt-1 text-2xl text-navy">Students needing a hand</CardTitle><p className="mt-1 text-sm text-muted-foreground">A quick check-in can keep a mission moving.</p></div></div><Link href="/teacher/students" className="inline-flex items-center gap-1 text-sm font-extrabold text-primary hover:text-ocean">See all students <ArrowRight className="size-4" /></Link></div></CardHeader><CardContent className="pt-5">
        {dashboard?.studentsNeedingAttention?.length ? <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{dashboard.studentsNeedingAttention.map((student, index) => <Link key={index} href={`/teacher/students/${student.user_id}`} className="flex items-center gap-3 rounded-2xl border border-border bg-aqua/50 p-4 hover:bg-aqua"><div className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-sm font-extrabold text-accent-foreground">{getInitials(student.name)}</div><div className="min-w-0 flex-1"><p className="truncate font-bold text-navy">{student.name}</p><p className="truncate text-xs text-muted-foreground">{"Needs a little encouragement"}</p></div><ArrowRight className="size-4 shrink-0 text-ocean" /></Link>)}</div> : <div className="flex items-center gap-4 rounded-2xl bg-aqua p-5"><div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-leaf text-primary-foreground"><CheckCircle2 className="size-5" /></div><div><p className="font-bold text-navy">Everyone is on track!</p><p className="mt-1 text-sm text-muted-foreground">No students need follow-up right now.</p></div></div>}
      </CardContent></Card>
    </div>
  );
}

function SummaryCard({ title, value, description, icon, color }: { title: string; value: number; description: string; icon: React.ReactNode; color: string }) {
  return <Card className="border-2 border-border bg-card shadow-playful"><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div className={`grid size-11 place-items-center rounded-2xl ${color}`}>{icon}</div><span className="font-display text-4xl leading-none tracking-tight text-navy">{value}</span></div><p className="mt-5 font-display text-lg text-navy">{title}</p><p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p></CardContent></Card>;
}

function EmptyState({ text }: { text: string }) { return <div className="flex items-center gap-3 py-8 text-sm font-bold text-muted-foreground"><Clock3 className="size-4 text-ocean" />{text}</div>; }

function getInitials(name: string) { return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase(); }

function formatActivityType(type: string) {
  switch (type) { case "level": return "Level"; case "tutorial": return "Tutorial"; case "knowledge_check": return "Knowledge check"; default: return type; }
}

function formatDate(date: string) { return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }); }
