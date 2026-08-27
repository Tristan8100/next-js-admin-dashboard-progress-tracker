"use client";

import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Loader2,
  Users,
  AlertCircle,
} from "lucide-react";

import { useDashboard } from "../hooks/use-dashboard";

import { useVerifyUser } from "@/features/users/hooks/user-verify-user";
import { getApiErrorMessage } from "@/lib/api-error";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const {
    data: user,
    isLoading: userLoading,
    isError: userIsError,
    error: userError,
  } = useVerifyUser();

  const {
    data: dashboard,
    isLoading: dashboardLoading,
    isError: dashboardIsError,
    error: dashboardError,
  } = useDashboard();

  const isLoading =
    userLoading || dashboardLoading;

  const isError =
    userIsError || dashboardIsError;

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-destructive">
          {getApiErrorMessage(
            userError ?? dashboardError,
          )}
        </p>
      </div>
    );
  }

  const summary = dashboard?.summary;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Good evening,{" "}
          {user?.user_info.name ?? "Teacher"}
        </h1>

        <p className="text-sm text-muted-foreground">
          Here's an overview of your students and
          their progress.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Students"
          value={summary?.totalStudents ?? 0}
          description="Registered students"
          icon={<Users className="size-5" />}
        />

        <SummaryCard
          title="Started Students"
          value={summary?.startedStudents ?? 0}
          description="Students who started"
          icon={<GraduationCap className="size-5" />}
        />

        <SummaryCard
          title="Active Students"
          value={summary?.activeStudents ?? 0}
          description="Recently active"
          icon={<Activity className="size-5" />}
        />

        <SummaryCard
          title="Average Completed"
          value={summary?.averageCompleted ?? 0}
          description="Average completed items"
          icon={<CheckCircle2 className="size-5" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">
                  Recent Activity
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                  Latest student progress
                </p>
              </div>

              <Activity className="size-5 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardContent>
            {dashboard?.recentActivity?.length ? (
              <div className="space-y-4">
                {dashboard.recentActivity.map(
                  (activity, index) => (
                    <div
                      key={`${activity.user_id}-${activity.rank}-${activity.type}-${activity.level ?? index}`}
                      className="flex items-start justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="font-medium">
                          {activity.student_name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          @{activity.username}
                        </p>

                        <p className="mt-1 text-sm">
                          {activity.map_name}
                          {" · "}
                          {formatActivityType(
                            activity.type,
                          )}

                          {activity.level !==
                            undefined &&
                            ` ${activity.level}`}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        {activity.score !==
                          undefined && (
                          <Badge variant="secondary">
                            Score {activity.score}
                          </Badge>
                        )}

                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatDate(
                            activity.date_acquired,
                          )}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <EmptyState text="No recent activity." />
            )}
          </CardContent>
        </Card>

        {/* Recent Students */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">
                  Recent Students
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                  Recently registered students
                </p>
              </div>

              <Users className="size-5 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardContent>
            {dashboard?.recentStudents?.length ? (
              <div className="space-y-4">
                {dashboard.recentStudents.map(
                  (student) => (
                    <Link
                      key={student._id}
                      href={`/teacher/students/${student._id}`}
                      className="flex items-center justify-between gap-4 border-b pb-4 last:border-0 last:pb-0 hover:opacity-70"
                    >
                      <div className="min-w-0">
                        <p className="font-medium">
                          {student.name}
                        </p>

                        {student.username && (
                          <p className="text-sm text-muted-foreground">
                            @{student.username}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 text-right">
                        {student.gradeLevel !==
                          undefined && (
                          <p className="text-sm">
                            Grade{" "}
                            {student.gradeLevel}
                          </p>
                        )}

                        {student.section && (
                          <p className="text-xs text-muted-foreground">
                            Section{" "}
                            {student.section}
                          </p>
                        )}
                      </div>
                    </Link>
                  ),
                )}
              </div>
            ) : (
              <EmptyState text="No students yet." />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Students Needing Attention */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">
                Students Needing Attention
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                Students that may require follow-up
              </p>
            </div>

            <AlertCircle className="size-5 text-muted-foreground" />
          </div>
        </CardHeader>

        <CardContent>
          {dashboard?.studentsNeedingAttention
            ?.length ? (
            <div className="space-y-4">
              {dashboard.studentsNeedingAttention.map(
                (student, index) => (
                  <Link
                    key={index}
                    href={`/teacher/students/${student._id}`}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">
                        {student.name}
                      </p>

                      {student.username && (
                        <p className="text-sm text-muted-foreground">
                          @{student.username}
                        </p>
                      )}
                    </div>

                    <Badge variant="outline">
                      {student.reason ??
                        "Needs attention"}
                    </Badge>
                  </Link>
                ),
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-lg border border-dashed p-4">
              <CheckCircle2 className="size-5 text-muted-foreground" />

              <div>
                <p className="text-sm font-medium">
                  All students are doing well
                </p>

                <p className="text-xs text-muted-foreground">
                  No students currently need attention.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>

          <span className="text-2xl font-semibold">
            {value}
          </span>
        </div>

        <div className="mt-4">
          <p className="font-medium">{title}</p>

          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 py-8 text-sm text-muted-foreground">
      <Clock3 className="size-4" />
      {text}
    </div>
  );
}

function formatActivityType(type: string) {
  switch (type) {
    case "level":
      return "Level";

    case "tutorial":
      return "Tutorial";

    case "knowledge_check":
      return "Knowledge Check";

    default:
      return type;
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );
}