"use client"

import Link from "next/link"

import {
  Activity,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  Loader2,
  PlayCircle,
  Trophy,
  TrendingDown,
  Users,
} from "lucide-react"

import { useState } from "react"

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

export default function AnalyticsPage() {
  const [gradeLevel, setGradeLevel] = useState<string>("all")

  const [section, setSection] = useState<string>("all")

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const query = {
    ...(gradeLevel !== "all"
      ? {
          gradeLevel: Number(gradeLevel),
        }
      : {}),

    ...(section !== "all"
      ? {
          section,
        }
      : {}),
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
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-destructive">{getApiErrorMessage(error)}</p>
      </div>
    )
  }

  const {
    overview,
    studentsByGrade,
    studentsBySection,
    mapPerformance,
    activity,
  } = data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>

        <p className="text-sm text-muted-foreground">
          Monitor student progress and performance.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Select
              value={gradeLevel}
              onValueChange={(value) => setGradeLevel(value ?? "all")}
            >
              <SelectTrigger className="w-full sm:w-[170px]">
                <SelectValue placeholder="Grade level" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All grades</SelectItem>

                {Array.from({ length: 12 }, (_, index) => index + 1).map(
                  (grade) => (
                    <SelectItem key={grade} value={String(grade)}>
                      Grade {grade}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <Select
              value={section}
              onValueChange={(value) => setSection(value ?? "all")}
            >
              <SelectTrigger className="w-full sm:w-[170px]">
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
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">Student Leaderboard</CardTitle>

              <p className="text-sm text-muted-foreground">
                Top performers and students who may need support.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Input
                aria-label="Leaderboard start date"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="w-[155px]"
              />

              <Input
                aria-label="Leaderboard end date"
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(event) => setEndDate(event.target.value)}
                className="w-[155px]"
              />

              {(startDate || endDate) && (
                <Button
                  variant="outline"
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

        <CardContent>
          {isLeaderboardLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : isLeaderboardError ? (
            <div className="flex h-32 items-center justify-center">
              <p className="text-sm text-destructive">
                {getApiErrorMessage(leaderboardError)}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <LeaderboardList
                title="Top performers"
                icon={Trophy}
                entries={leaderboard?.top ?? []}
                emptyText="No top performers for this period."
              />

              <LeaderboardList
                title="Needs attention"
                icon={TrendingDown}
                entries={leaderboard?.bottom ?? []}
                emptyText="No students need attention for this period."
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Students"
          value={overview.totalStudents}
          icon={Users}
        />

        <SummaryCard
          title="Started"
          value={overview.startedStudents}
          icon={PlayCircle}
        />

        <SummaryCard
          title="Active Students"
          value={overview.activeStudents}
          icon={Activity}
        />

        <SummaryCard
          title="Total Completed"
          value={overview.totalCompleted}
          icon={CheckCircle2}
        />
      </div>

      {/* Average Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Average Student Progress</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
              <GraduationCap className="size-5" />
            </div>

            <div>
              <p className="text-2xl font-semibold">
                {overview.averageCompleted}
              </p>

              <p className="text-sm text-muted-foreground">
                Average completed activities per student
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students by Grade / Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Students by Grade</CardTitle>
          </CardHeader>

          <CardContent>
            {studentsByGrade.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {studentsByGrade.map((grade) => {
                  const percentage =
                    overview.totalStudents > 0
                      ? (grade.count / overview.totalStudents) * 100
                      : 0

                  return (
                    <div key={grade.gradeLevel} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            Grade {grade.gradeLevel}
                          </Badge>

                          <span className="text-sm text-muted-foreground">
                            {grade.count} students
                          </span>
                        </div>

                        <span className="text-sm font-medium">
                          {Math.round(percentage)}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Students by Section</CardTitle>
          </CardHeader>

          <CardContent>
            {studentsBySection.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {studentsBySection.map((section) => (
                  <div key={section.section} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Section {section.section}</p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Students
                        </p>
                      </div>

                      <p className="text-2xl font-semibold">{section.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Map Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Map Performance</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {mapPerformance.length === 0 ? (
            <div className="p-6">
              <EmptyState />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-6 py-3 text-left font-medium">Map</th>

                    <th className="px-6 py-3 text-left font-medium">Rank</th>

                    <th className="px-6 py-3 text-left font-medium">
                      Students
                    </th>

                    <th className="px-6 py-3 text-left font-medium">
                      Completed
                    </th>

                    <th className="px-6 py-3 text-left font-medium">
                      Avg. Score
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {mapPerformance.map((map) => (
                    <tr
                      key={`${map.rank}-${map.name}`}
                      className="border-b last:border-0"
                    >
                      <td className="px-6 py-3 font-medium">{map.name}</td>

                      <td className="px-6 py-3">
                        <Badge variant="outline">Rank {map.rank}</Badge>
                      </td>

                      <td className="px-6 py-3">{map.students}</td>

                      <td className="px-6 py-3">{map.completed}</td>

                      <td className="px-6 py-3">{map.averageScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {activity.length === 0 ? (
            <div className="p-6">
              <EmptyState />
            </div>
          ) : (
            <div className="divide-y">
              {activity.map((item, index) => (
                <div
                  key={`${item.user_id}-${item.date_acquired}-${index}`}
                  className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Activity className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {item.student_name}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        @{item.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:justify-end">
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.map_name}</p>

                      <p className="text-xs text-muted-foreground capitalize">
                        {item.type.replace("_", " ")}

                        {item.level !== undefined &&
                          ` • Level ${displayLevel(item.level)}`}
                      </p>
                    </div>

                    {item.score !== undefined && (
                      <Badge variant="secondary">{item.score}</Badge>
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
  icon: Icon,
}: {
  title: string
  value: number
  icon: React.ElementType
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-5" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <p className="text-2xl font-semibold tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="py-8 text-center">
      <BarChart3 className="mx-auto size-7 text-muted-foreground" />

      <p className="mt-2 text-sm text-muted-foreground">
        No analytics data available.
      </p>
    </div>
  )
}

function LeaderboardList({
  title,
  icon: Icon,
  entries,
  emptyText,
}: {
  title: string
  icon: React.ElementType
  entries: LeaderboardEntry[]
  emptyText: string
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" />
        <p className="text-sm font-medium">{title}</p>
      </div>

      {entries.length === 0 ? (
        <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          {emptyText}
        </p>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => (
            <Link
              key={entry.user_id}
              href={`/teacher/students/${entry.user_id}`}
              className="flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Badge variant="secondary">#{entry.rank}</Badge>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {entry.student_name}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    @{entry.username} · Grade {entry.gradeLevel} · Section{" "}
                    {entry.section}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-medium">{entry.totalScore} pts</p>

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
