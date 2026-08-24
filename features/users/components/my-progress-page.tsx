"use client";

import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Layers3,
  Loader2,
  Trophy,
} from "lucide-react";

import { useMyProgress } from "../hooks/use-my-progress";
import { getApiErrorMessage } from "@/lib/api-error";
import { displayLevel } from "@/lib/progress";

function formatProgressType(type: string) {
  return type
    .replace("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function MyProgressPage() {
  const {
    data: maps,
    isLoading,
    isError,
    error,
  } = useMyProgress();

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="font-medium text-destructive">
            Failed to load progress
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {getApiErrorMessage(error)}
          </p>
        </div>
      </div>
    );
  }

  const totalProgress =
    maps?.reduce(
      (total, map) => total + map.progress.length,
      0,
    ) ?? 0;

  const completedMaps =
    maps?.filter((map) => map.progress.length > 0).length ?? 0;

  const totalMaps = maps?.length ?? 0;

  if (!maps || maps.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            My Progress
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track your learning progress across all maps.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-10 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
            <BookOpen className="size-6 text-muted-foreground" />
          </div>

          <h2 className="mt-4 font-semibold">
            No maps available yet
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your maps and progress will appear here once they are
            assigned to you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          My Progress
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Track your learning progress across all maps.
        </p>
      </div>

      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
              <Layers3 className="size-5 text-muted-foreground" />
            </div>

            <span className="text-xs text-muted-foreground">
              Maps
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold">
            {totalMaps}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Total maps
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
              <CheckCircle2 className="size-5 text-muted-foreground" />
            </div>

            <span className="text-xs text-muted-foreground">
              Completed
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold">
            {totalProgress}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Completed activities
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
              <Trophy className="size-5 text-muted-foreground" />
            </div>

            <span className="text-xs text-muted-foreground">
              Progress
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold">
            {completedMaps}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Maps started
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
              <Clock3 className="size-5 text-muted-foreground" />
            </div>

            <span className="text-xs text-muted-foreground">
              Status
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold">
            {totalProgress > 0 ? "Active" : "Not started"}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Overall learning status
          </p>
        </div>
      </div>

      {/* Maps */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">
            Maps
          </h2>

          <p className="text-sm text-muted-foreground">
            Your progress for each learning map.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {maps.map((map) => {
            const progressCount = map.progress.length;

            return (
              <div
                key={map._id}
                className="overflow-hidden rounded-2xl border bg-card"
              >
                {/* Map Header */}
                <div className="border-b p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <BookOpen className="size-5 text-muted-foreground" />
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Rank {map.rank}
                        </p>

                        <h3 className="mt-1 text-lg font-semibold">
                          {map.name}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {progressCount}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {progressCount === 1
                          ? "activity"
                          : "activities"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="p-5">
                  {progressCount === 0 ? (
                    <div className="rounded-xl border border-dashed p-6 text-center">
                      <Clock3 className="mx-auto size-5 text-muted-foreground" />

                      <p className="mt-2 text-sm font-medium">
                        No progress yet
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Complete an activity in this map to
                        start tracking your progress.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {map.progress.map(
                        (progress, index) => (
                          <div
                            key={`${progress.type}-${progress.level ?? "none"}-${index}`}
                            className="rounded-xl border bg-muted/30 p-4"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="size-4 shrink-0" />

                                  <p className="truncate font-medium">
                                    {formatProgressType(
                                      progress.type,
                                    )}
                                  </p>
                                </div>

                                {progress.level !==
                                  undefined && (
                                  <p className="mt-1 pl-6 text-sm text-muted-foreground">
                                    Level{" "}
                                    {displayLevel(progress.level)}
                                  </p>
                                )}
                              </div>

                              <div className="shrink-0 text-right">
                                {progress.score !==
                                  undefined ? (
                                  <>
                                    <p className="font-semibold">
                                      {progress.score}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                      Score
                                    </p>
                                  </>
                                ) : (
                                  <p className="text-xs text-muted-foreground">
                                    No score
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mt-3 border-t pt-3">
                              <p className="text-xs text-muted-foreground">
                                Completed{" "}
                                {new Date(
                                  progress.date_acquired,
                                ).toLocaleDateString(
                                  undefined,
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  },
                                )}
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
