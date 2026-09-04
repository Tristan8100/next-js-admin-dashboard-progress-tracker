"use client";

import { useMemo } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Layers3,
  Loader2,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { useMyProgress } from "../hooks/use-my-progress";
import { getApiErrorMessage } from "@/lib/api-error";
import { displayLevel } from "@/lib/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProgressEntry = {
  type: string;
  level?: number;
  score?: number;
  date_acquired: string;
};

type MapWithProgress = {
  _id: string;
  name: string;
  rank: number;
  progress: ProgressEntry[];
};

const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--leaf))",
  "hsl(var(--coral))",
];

function formatProgressType(type: string) {
  return type.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function MyProgressPage() {
  const { data: maps, isLoading, isError, error } = useMyProgress();

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="grid size-16 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-playful">
          <Loader2 className="size-7 animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex min-h-[400px] max-w-md flex-col items-center justify-center text-center">
        <div className="grid size-16 place-items-center rounded-3xl bg-destructive/10 text-destructive">
          <Clock3 className="size-7" />
        </div>
        <h1 className="font-display mt-5 text-2xl text-navy">We could not load your progress.</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{getApiErrorMessage(error)}</p>
      </div>
    );
  }

  const totalProgress = maps?.reduce((total, map) => total + map.progress.length, 0) ?? 0;
  const completedMaps = maps?.filter((map) => map.progress.length > 0).length ?? 0;
  const totalMaps = maps?.length ?? 0;

  if (!maps || maps.length === 0) {
    return (
      <div className="space-y-7 pb-6">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-aqua/50 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ocean">
            <Sparkles className="size-3.5" /> Your journey
          </p>
          <h1 className="font-display mt-4 text-4xl tracking-tight text-navy">My progress</h1>
          <p className="mt-2 text-base leading-7 text-muted-foreground">Track your learning progress across all maps.</p>
        </div>

        <Card className="border-2 border-border bg-card shadow-playful">
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <div className="grid size-14 place-items-center rounded-2xl bg-aqua text-ocean">
              <BookOpen className="size-6" />
            </div>
            <h2 className="font-display text-xl text-navy">No maps available yet</h2>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Your maps and progress will appear here once they are assigned to you.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-7 pb-6">
      <section className="relative overflow-hidden rounded-[2rem] border-2 border-border bg-primary px-6 py-8 text-primary-foreground shadow-playful-lg sm:px-9 sm:py-10">
        <div className="absolute -right-8 -top-10 size-40 rounded-full bg-secondary/90" aria-hidden="true" />
        <div className="absolute -bottom-16 right-24 size-32 rounded-full border-[18px] border-card/15" aria-hidden="true" />
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.16em]">
            <Sparkles className="size-3.5" /> Your journey
          </p>
          <h1 className="font-display mt-5 max-w-2xl text-balance text-4xl tracking-tight sm:text-5xl">My progress</h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-primary-foreground/85 sm:text-lg">
            Track your learning progress across all maps.
          </p>
        </div>
      </section>

      <section aria-labelledby="overview-heading">
        <div className="mb-4">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-ocean">Overview</p>
          <h2 id="overview-heading" className="font-display mt-1 text-3xl tracking-tight text-navy">Where you stand</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard title="Total maps" value={totalMaps} description="Maps on your journey" icon={<Layers3 className="size-5" />} color="bg-primary text-primary-foreground" />
          <SummaryCard title="Completed activities" value={totalProgress} description="Discoveries made so far" icon={<CheckCircle2 className="size-5" />} color="bg-secondary text-secondary-foreground" />
          <SummaryCard title="Maps started" value={completedMaps} description="You've begun exploring" icon={<Trophy className="size-5" />} color="bg-accent text-accent-foreground" />
          <SummaryCard
            title="Status"
            value={totalProgress > 0 ? "Active" : "Not started"}
            description="Overall learning status"
            icon={<Clock3 className="size-5" />}
            color="bg-leaf text-primary-foreground"
            isText
          />
        </div>
      </section>

      <section aria-labelledby="maps-heading">
        <div className="mb-4">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-ocean">Maps</p>
          <h2 id="maps-heading" className="font-display mt-1 text-3xl tracking-tight text-navy">Your progress for each map</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {maps.map((map) => (
            <MapProgressCard key={map._id} map={map} />
          ))}
        </div>
      </section>
    </div>
  );
}

function MapProgressCard({ map }: { map: MapWithProgress }) {
  const progressCount = map.progress.length;

  const typeBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    for (const entry of map.progress) {
      counts.set(entry.type, (counts.get(entry.type) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([type, count]) => ({
      name: formatProgressType(type),
      value: count,
    }));
  }, [map.progress]);

  const avgScore = useMemo(() => {
    const scores = map.progress.filter((p) => p.score !== undefined).map((p) => p.score as number);
    if (scores.length === 0) return null;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [map.progress]);

  return (
    <Card className="overflow-hidden border-2 border-border bg-card shadow-playful">
      <CardHeader className="border-b border-border pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-aqua text-ocean">
              <BookOpen className="size-5" />
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ocean">Rank {map.rank}</p>
              <CardTitle className="font-display mt-1 text-xl text-navy">{map.name}</CardTitle>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl leading-none tracking-tight text-navy">{progressCount}</p>
            <p className="mt-1 text-xs font-bold text-muted-foreground">
              {progressCount === 1 ? "activity" : "activities"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-5">
        {progressCount === 0 ? (
          <div className="flex items-center gap-4 rounded-2xl bg-aqua p-5">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-card/70 text-ocean">
              <Clock3 className="size-5" />
            </div>
            <div>
              <p className="font-bold text-navy">No progress yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Complete an activity in this map to start tracking.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-[120px_1fr] sm:items-center">
            <div className="mx-auto size-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={34}
                    outerRadius={56}
                    paddingAngle={typeBreakdown.length > 1 ? 3 : 0}
                    strokeWidth={0}
                  >
                    {typeBreakdown.map((entry, index) => (
                      <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "2px solid hsl(var(--border))",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {typeBreakdown.map((entry, index) => (
                  <span
                    key={entry.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-aqua/40 px-2.5 py-1 text-xs font-bold text-navy"
                  >
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                    />
                    {entry.name} · {entry.value}
                  </span>
                ))}
              </div>

              {avgScore !== null && (
                <p className="text-sm text-muted-foreground">
                  Average score <span className="font-bold text-navy">{avgScore} pts</span>
                </p>
              )}

              <Dialog>
                <DialogTrigger className="inline-flex items-center gap-1 text-sm font-extrabold text-primary hover:text-ocean">
                    View all activity <ArrowRight className="size-4" />
                </DialogTrigger>
                <DialogContent className="border-2 border-border sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl text-navy">{map.name}</DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[60vh] divide-y divide-border overflow-y-auto pr-1">
                    {map.progress.map((progress, index) => (
                      <div
                        key={`${progress.type}-${progress.level ?? "none"}-${index}`}
                        className="flex items-center gap-3 py-4 first:pt-2"
                      >
                        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-leaf/15 text-leaf">
                          <CheckCircle2 className="size-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold text-navy">{formatProgressType(progress.type)}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {progress.level !== undefined ? `Level ${displayLevel(progress.level)}` : "Completed"}
                            <span aria-hidden="true"> · </span>
                            {new Date(progress.date_acquired).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          {progress.score !== undefined ? (
                            <Badge className="rounded-lg bg-primary/10 text-primary hover:bg-primary/10">{progress.score} pts</Badge>
                          ) : (
                            <p className="text-xs font-bold text-muted-foreground">No score</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon,
  color,
  isText,
}: {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isText?: boolean;
}) {
  return (
    <Card className="border-2 border-border bg-card shadow-playful">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className={`grid size-11 place-items-center rounded-2xl ${color}`}>{icon}</div>
          <span className={`font-display leading-none tracking-tight text-navy ${isText ? "text-2xl" : "text-4xl"}`}>
            {value}
          </span>
        </div>
        <p className="mt-5 font-display text-lg text-navy">{title}</p>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}