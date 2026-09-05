"use client"

import Link from "next/link"
import { useState } from "react"

import {
  Activity,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  Loader2,
  PlayCircle,
  Sparkles,
  Trophy,
  TrendingDown,
  Users,
} from "lucide-react"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { useAnalytics } from "../hooks/use-analytics"
import { useLeaderboard } from "@/features/users/hooks/use-leaderboard"
import {
  LeaderboardEntry,
  LeaderboardQuery,
} from "@/features/users/types/user.types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { getApiErrorMessage } from "@/lib/api-error"
import { displayLevel } from "@/lib/progress"

const CHART_COLORS = [
  "var(--primary)",
  "var(--secondary)",
  "var(--accent)",
  "var(--leaf)",
  "var(--coral)",
  "var(--ocean)",
]

const CHART_TOOLTIP_STYLE = {
  borderRadius: 12,
  border: "2px solid var(--border)",
  fontSize: 12,
  fontWeight: 600,
}

export default function AnalyticsPage() {
  const [gradeLevel, setGradeLevel] = useState<string>("all")
  const [section, setSection] = useState<string>("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const query = {
    ...(gradeLevel !== "all" ? { gradeLevel: Number(gradeLevel) } : {}),
    ...(section !== "all" ? { section } : {}),
  }

  const { data, isLoading, isError, error } = useAnalytics(query)

  const leaderboardQuery: LeaderboardQuery = {
    ...(startDate ? { startDate } : {}),
    ...(endDate ? { endDate } : {}),
  }

  const {
    data: leaderboard,
    isLoading: isLeaderboardLoading,
    isError: isLeaderboardError,
    error: leaderboardError,
  } = useLeaderboard(leaderboardQuery)

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="grid size-16 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-playful">
          <Loader2 className="size-7 animate-spin" />
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="mx-auto flex min-h-[400px] max-w-md flex-col items-center justify-center text-center">
        <div className="grid size-16 place-items-center rounded-3xl bg-destructive/10 text-destructive">
          <BarChart3 className="size-7" />
        </div>
        <h1 className="font-display mt-5 text-2xl text-navy">We could not load analytics.</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{getApiErrorMessage(error)}</p>
      </div>
    )
  }

  const { overview, studentsByGrade, studentsBySection, mapPerformance, activity } = data

  const gradeChartData = studentsByGrade.map((grade) => ({
    label: `Grade ${grade.gradeLevel}`,
    count: grade.count,
  }))

  const sectionChartData = studentsBySection.map((sec) => ({
    label: `Section ${sec.section}`,
    value: sec.count,
  }))

  const mapChartData = mapPerformance.map((map) => ({
    label: map.name.length > 12 ? `${map.name.slice(0, 12)}…` : map.name,
    fullName: map.name,
    avgScore: map.averageScore.toFixed(2),
  }))

  return (
    <div className="space-y-7 pb-6">
      <section className="relative overflow-hidden rounded-[2rem] border-2 border-border bg-primary px-6 py-8 text-primary-foreground shadow-playful-lg sm:px-9 sm:py-10">
        <div className="absolute -right-8 -top-10 size-40 rounded-full bg-secondary/90" aria-hidden="true" />
        <div className="absolute -bottom-16 right-24 size-32 rounded-full border-[18px] border-card/15" aria-hidden="true" />
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.16em]">
            <Sparkles className="size-3.5" /> Class insights
          </p>
          <h1 className="font-display mt-5 max-w-2xl text-balance text-4xl tracking-tight sm:text-5xl">Analytics</h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-primary-foreground/85 sm:text-lg">
            Monitor student progress and performance.
          </p>
        </div>
      </section>

      {/* Filters */}
      <Card className="border-2 border-border bg-card shadow-playful">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Select value={gradeLevel} onValueChange={(value) => setGradeLevel(value ?? "all")}>
              <SelectTrigger className="w-full rounded-xl border-border sm:w-[170px]">
                <SelectValue placeholder="Grade level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All grades</SelectItem>
                {Array.from({ length: 12 }, (_, index) => index + 1).map((grade) => (
                  <SelectItem key={grade} value={String(grade)}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={section} onValueChange={(value) => setSection(value ?? "all")}>
              <SelectTrigger className="w-full rounded-xl border-border sm:w-[170px]">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sections</SelectItem>
                {["A", "B", "C", "D"].map((value) => (
                  <SelectItem key={value} value={value}>
                    Section {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="rounded-xl border-border"
              onClick={() => {
                setGradeLevel("all")
                setSection("all")
              }}
            >
              Clear filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="border-2 border-border bg-card shadow-playful">
        <CardHeader className="border-b border-border pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ocean">Standings</p>
              <CardTitle className="font-display mt-1 text-2xl text-navy">Student leaderboard</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Top performers and students who may need support.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Input
                aria-label="Leaderboard start date"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="w-[155px] rounded-xl border-border"
              />
              <Input
                aria-label="Leaderboard end date"
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(event) => setEndDate(event.target.value)}
                className="w-[155px] rounded-xl border-border"
              />
              {(startDate || endDate) && (
                <Button
                  variant="outline"
                  className="rounded-xl border-border"
                  onClick={() => {
                    setStartDate("")
                    setEndDate("")
                  }}
                >
                  Clear dates
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-5">
          {isLeaderboardLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : isLeaderboardError ? (
            <div className="flex h-32 items-center justify-center">
              <p className="text-sm font-bold text-destructive">{getApiErrorMessage(leaderboardError)}</p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <LeaderboardList
                title="Top performers"
                icon={Trophy}
                iconColor="bg-secondary text-secondary-foreground"
                entries={leaderboard?.top ?? []}
                emptyText="No top performers for this period."
              />
              <LeaderboardList
                title="Needs attention"
                icon={TrendingDown}
                iconColor="bg-coral/15 text-coral"
                entries={leaderboard?.bottom ?? []}
                emptyText="No students need attention for this period."
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Overview */}
      <section aria-labelledby="overview-heading">
        <div className="mb-4">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-ocean">Overview</p>
          <h2 id="overview-heading" className="font-display mt-1 text-3xl tracking-tight text-navy">The big picture</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard title="Total students" value={overview.totalStudents} icon={<Users className="size-5" />} color="bg-primary text-primary-foreground" />
          <SummaryCard title="Started" value={overview.startedStudents} icon={<PlayCircle className="size-5" />} color="bg-secondary text-secondary-foreground" />
          <SummaryCard title="Active students" value={overview.activeStudents} icon={<Activity className="size-5" />} color="bg-accent text-accent-foreground" />
          <SummaryCard title="Total completed" value={overview.totalCompleted} icon={<CheckCircle2 className="size-5" />} color="bg-leaf text-primary-foreground" />
        </div>
      </section>

      {/* Average Progress */}
      <Card className="border-2 border-border bg-card shadow-playful">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-aqua text-ocean">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <p className="font-display text-3xl leading-none tracking-tight text-navy">{overview.averageCompleted}</p>
            <p className="mt-1 text-sm text-muted-foreground">Average completed activities per student</p>
          </div>
        </CardContent>
      </Card>

      {/* Students by Grade / Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-2 border-border bg-card shadow-playful">
          <CardHeader className="border-b border-border pb-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ocean">Distribution</p>
            <CardTitle className="font-display mt-1 text-xl text-navy">Students by grade</CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            {gradeChartData.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeChartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="var(--border)" />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 12, fontWeight: 600, fill: "var(--muted-foreground)" }}
                      axisLine={{ stroke: "var(--border)" }}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 12, fontWeight: 600, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip cursor={{ fill: "var(--aqua, #d3f0f7)", fillOpacity: 0.35 }}/>
                    <Bar dataKey="count" name="Students" radius={[8, 8, 0, 0]}>
                      {gradeChartData.map((entry, index) => (
                        <Cell key={entry.label} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 border-border bg-card shadow-playful">
          <CardHeader className="border-b border-border pb-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ocean">Distribution</p>
            <CardTitle className="font-display mt-1 text-xl text-navy">Students by section</CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            {sectionChartData.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-4 sm:grid-cols-[160px_1fr] sm:items-center">
                <div className="mx-auto size-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectionChartData}
                        dataKey="value"
                        nameKey="label"
                        innerRadius={46}
                        outerRadius={76}
                        paddingAngle={sectionChartData.length > 1 ? 3 : 0}
                        strokeWidth={0}
                      >
                        {sectionChartData.map((entry, index) => (
                          <Cell key={entry.label} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {sectionChartData.map((entry, index) => (
                    <div key={entry.label} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-aqua/30 px-3 py-2">
                      <span className="flex items-center gap-2 text-sm font-bold text-navy">
                        <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                        {entry.label}
                      </span>
                      <span className="text-sm font-bold text-muted-foreground">{entry.value} students</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Map Performance */}
      <Card className="border-2 border-border bg-card shadow-playful">
        <CardHeader className="border-b border-border pb-5">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ocean">Performance</p>
          <CardTitle className="font-display mt-1 text-xl text-navy">Map performance</CardTitle>
        </CardHeader>

        <CardContent className="pt-5">
          {mapPerformance.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mapChartData} layout="vertical" margin={{ top: 0, right: 24, left: 0, bottom: 0 }}>
                    <CartesianGrid horizontal={false} stroke="var(--border)" />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fontWeight: 600, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis
                      dataKey="label"
                      type="category"
                      width={100}
                      tick={{ fontSize: 12, fontWeight: 600, fill: "var(--navy)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    {/* <Tooltip
                      cursor={{ fill: "var(--aqua)" }}
                      contentStyle={CHART_TOOLTIP_STYLE}
                      formatter={(value: number) => [`${value}`, "Avg. score"]}
                      labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName ?? ""}
                    /> */}
                    <Tooltip
                      cursor={{ fill: "var(--aqua, #d3f0f7)", fillOpacity: 0.35 }}
                      contentStyle={CHART_TOOLTIP_STYLE}
                      labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName ?? ""}
                    />
                    <Bar dataKey="avgScore" name="Avg. score" radius={[0, 8, 8, 0]} fill="var(--primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-aqua/30">
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase tracking-[0.12em] text-ocean">Map</th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase tracking-[0.12em] text-ocean">Rank</th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase tracking-[0.12em] text-ocean">Students</th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase tracking-[0.12em] text-ocean">Completed</th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase tracking-[0.12em] text-ocean">Avg. Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mapPerformance.map((map) => (
                      <tr key={`${map.rank}-${map.name}`} className="border-b border-border last:border-0">
                        <td className="px-6 py-3 font-bold text-navy">{map.name}</td>
                        <td className="px-6 py-3">
                          <Badge className="rounded-lg bg-secondary/20 text-secondary-foreground hover:bg-secondary/20">Rank {map.rank}</Badge>
                        </td>
                        <td className="px-6 py-3 text-muted-foreground">{map.students}</td>
                        <td className="px-6 py-3 text-muted-foreground">{map.completed}</td>
                        <td className="px-6 py-3 font-bold text-navy">{map.averageScore.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-2 border-border bg-card shadow-playful">
        <CardHeader className="border-b border-border pb-5">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ocean">Live</p>
          <CardTitle className="font-display mt-1 text-xl text-navy">Recent activity</CardTitle>
        </CardHeader>

        <CardContent className="pt-2">
          {activity.length === 0 ? (
            <div className="py-6">
              <EmptyState />
            </div>
          ) : (
            <div className="divide-y divide-border">
              {activity.map((item, index) => (
                <div
                  key={`${item.user_id}-${item.date_acquired}-${index}`}
                  className="flex flex-col gap-3 py-4 first:pt-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-aqua text-ocean">
                      <Activity className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-navy">{item.student_name}</p>
                      <p className="text-sm text-muted-foreground">@{item.username}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:justify-end">
                    <div className="text-right">
                      <p className="text-sm font-bold text-navy">{item.map_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.type.replace("_", " ")}
                        {item.level !== undefined && ` · Level ${displayLevel(item.level)}`}
                      </p>
                    </div>
                    {item.score !== undefined && (
                      <Badge className="rounded-lg bg-primary/10 text-primary hover:bg-primary/10">{item.score} pts</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function SummaryCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}) {
  return (
    <Card className="border-2 border-border bg-card shadow-playful">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className={`grid size-11 place-items-center rounded-2xl ${color}`}>{icon}</div>
          <span className="font-display text-4xl leading-none tracking-tight text-navy">{value}</span>
        </div>
        <p className="mt-5 font-display text-lg text-navy">{title}</p>
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <div className="grid size-12 place-items-center rounded-2xl bg-aqua text-ocean">
        <BarChart3 className="size-6" />
      </div>
      <p className="text-sm text-muted-foreground">No analytics data available.</p>
    </div>
  )
}

function LeaderboardList({
  title,
  icon: Icon,
  iconColor,
  entries,
  emptyText,
}: {
  title: string
  icon: React.ElementType
  iconColor: string
  entries: LeaderboardEntry[]
  emptyText: string
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <div className={`grid size-8 place-items-center rounded-xl ${iconColor}`}>
          <Icon className="size-4" />
        </div>
        <p className="font-bold text-navy">{title}</p>
      </div>

      {entries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => (
            <Link
              key={entry.user_id}
              href={`/teacher/students/${entry.user_id}`}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3 transition-colors hover:bg-aqua/30"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Badge className="rounded-lg bg-secondary/20 text-secondary-foreground hover:bg-secondary/20">#{entry.rank}</Badge>
                <div className="min-w-0">
                  <p className="truncate font-bold text-navy">{entry.student_name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    @{entry.username} · Grade {entry.gradeLevel} · Section {entry.section}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-navy">{entry.totalScore} pts</p>
                <p className="text-xs text-muted-foreground">
                  {entry.levelsCompleted} completed · {entry.scoreRate}%
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}