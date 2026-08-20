"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Trophy,
} from "lucide-react";

import { useStudentProgress } from "../hooks/use-student-progress";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  studentId: string;
};

export default function StudentProgressPage({
  studentId,
}: Props) {
  const {
    data: maps,
    isLoading,
    isError,
  } = useStudentProgress(studentId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
        >
          <Link href="/teacher/students">
            <ArrowLeft className="mr-2 size-4" />
            Back to students
          </Link>
        </Button>

        <Card>
          <CardContent className="flex h-48 items-center justify-center">
            <p className="text-sm text-destructive">
              Failed to load student progress.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const studentMaps = maps ?? [];

  const totalProgress = studentMaps.reduce(
    (total, map) =>
      total + map.progress.length,
    0,
  );

  const completedLevels = studentMaps.reduce(
    (total, map) =>
      total +
      map.progress.filter(
        (item) => item.type === "level",
      ).length,
    0,
  );

  const knowledgeChecks = studentMaps.reduce(
    (total, map) =>
      total +
      map.progress.filter(
        (item) =>
          item.type === "knowledge_check",
      ).length,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          size="icon"
        >
          <Link href="/teacher/students">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Student Progress
          </h1>

          <p className="text-sm text-muted-foreground">
            View the student's complete learning
            progress.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg border p-2">
              <Trophy className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Maps
              </p>

              <p className="text-2xl font-semibold">
                {studentMaps.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg border p-2">
              <BookOpen className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Progress
              </p>

              <p className="text-2xl font-semibold">
                {totalProgress}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg border p-2">
              <GraduationCap className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Levels
              </p>

              <p className="text-2xl font-semibold">
                {completedLevels}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg border p-2">
              <CheckCircle2 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Knowledge Checks
              </p>

              <p className="text-2xl font-semibold">
                {knowledgeChecks}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maps */}
      <Card>
        <CardHeader>
          <CardTitle>
            Learning Progress
          </CardTitle>
        </CardHeader>

        <CardContent>
          {studentMaps.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center gap-2">
              <BookOpen className="size-8 text-muted-foreground" />

              <p className="font-medium">
                No progress yet
              </p>

              <p className="text-sm text-muted-foreground">
                This student has not completed any
                activities.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {studentMaps
                .sort((a, b) => a.rank - b.rank)
                .map((map) => (
                  <div
                    key={map._id}
                    className="rounded-lg border p-4"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {map.name}
                          </h3>

                          <Badge variant="secondary">
                            Rank {map.rank}
                          </Badge>
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {map.progress.length}{" "}
                          completed activities
                        </p>
                      </div>
                    </div>

                    {map.progress.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No progress in this map.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {map.progress
                          .sort(
                            (a, b) =>
                              (a.level ?? 0) -
                              (b.level ?? 0),
                          )
                          .map(
                            (
                              progress,
                              index,
                            ) => (
                              <div
                                key={`${progress.type}-${progress.level}-${index}`}
                                className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
                              >
                                <div className="flex items-center gap-3">
                                  <CheckCircle2 className="size-4 text-muted-foreground" />

                                  <div>
                                    <p className="text-sm font-medium">
                                      {progress.type ===
                                      "level"
                                        ? `Level ${progress.level}`
                                        : progress.type ===
                                            "tutorial"
                                          ? `Tutorial ${progress.level}`
                                          : `Knowledge Check ${progress.level}`}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                      {new Date(
                                        progress.date_acquired,
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>

                                {progress.score !==
                                  undefined && (
                                  <Badge variant="outline">
                                    Score:{" "}
                                    {
                                      progress.score
                                    }
                                  </Badge>
                                )}
                              </div>
                            ),
                          )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}