"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Search,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";

import { useStudents } from "../hooks/use-students";
import { StudentQuery } from "../types/user.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import RegisterStudentDialog from "./register-student-dialog";
import StudentDialog from "./edit-student-dialog";
import { getApiErrorMessage } from "@/lib/api-error";

function formatSection(section: string | undefined | null) {
  if (!section) return "—";
  const trimmed = section.trim();
  return trimmed.toLowerCase().startsWith("section") ? trimmed : `Section ${trimmed}`;
}

function formatGender(gender: "BOY" | "GIRL" | null | undefined) {
  if (!gender) return "—";
  return gender === "BOY" ? "Boy" : "Girl";
}

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [gradeLevel, setGradeLevel] = useState("all");
  const [section, setSection] = useState("all");
  const [gender, setGender] = useState("all");

  const [page, setPage] = useState(1);

  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const query: StudentQuery = {
    page,
    limit: 10,
    ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
    ...(gradeLevel !== "all" ? { gradeLevel: Number(gradeLevel) } : {}),
    ...(section !== "all" ? { section } : {}),
    ...(gender !== "all" ? { gender: gender as "BOY" | "GIRL" } : {}),
  };

  const { data, isLoading, isError, error } = useStudents(query);

  const students = data?.data ?? [];
  const pagination = data?.pagination;

  const handleManageStudent = (student: (typeof students)[number]) => {
    setSelectedStudent(student);
    setStudentDialogOpen(true);
  };

  return (
    <div className="space-y-7 pb-6">
      <section className="relative overflow-hidden rounded-[2rem] border-2 border-border bg-primary px-6 py-8 text-primary-foreground shadow-playful-lg sm:px-9 sm:py-10">
        <div className="absolute -right-8 -top-10 size-40 rounded-full bg-secondary/90" aria-hidden="true" />
        <div className="absolute -bottom-16 right-24 size-32 rounded-full border-[18px] border-card/15" aria-hidden="true" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.16em]">
              <Sparkles className="size-3.5" /> Your classroom
            </p>
            <h1 className="font-display mt-5 max-w-2xl text-balance text-4xl tracking-tight sm:text-5xl">Students</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-primary-foreground/85 sm:text-lg">
              Manage and view your students.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-xl bg-primary-foreground/10 px-4 py-2.5 font-bold">
              <Users className="size-4" />
              <span>{pagination?.total ?? 0} students</span>
            </div>
            <RegisterStudentDialog />
          </div>
        </div>
      </section>

      {/* Filters */}
      <Card className="border-2 border-border bg-card shadow-playful">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or username..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="rounded-xl border-border pl-9"
              />
            </div>

            <Select
              value={gradeLevel}
              onValueChange={(value) => {
                if (value === null) return;
                setGradeLevel(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[150px] rounded-xl border-border">
                <SelectValue />
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

            <Select
              value={section}
              onValueChange={(value) => {
                if (value === null) return;
                setSection(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[150px] rounded-xl border-border">
                <SelectValue />
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

            <Select
              value={gender}
              onValueChange={(value) => {
                if (value === null) return;
                setGender(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[150px] rounded-xl border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All genders</SelectItem>
                <SelectItem value="BOY">Boy</SelectItem>
                <SelectItem value="GIRL">Girl</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Student Cards */}
      {isLoading ? (
        <div className="flex h-48 items-center justify-center">
          <div className="grid size-14 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-playful">
            <Loader2 className="size-6 animate-spin" />
          </div>
        </div>
      ) : isError ? (
        <Card className="border-2 border-border bg-card shadow-playful">
          <CardContent className="flex h-40 items-center justify-center">
            <p className="text-sm font-bold text-destructive">{getApiErrorMessage(error)}</p>
          </CardContent>
        </Card>
      ) : students.length === 0 ? (
        <Card className="border-2 border-dashed border-border bg-card shadow-none">
          <CardContent className="flex h-48 flex-col items-center justify-center gap-3 text-center">
            <div className="grid size-14 place-items-center rounded-2xl bg-aqua text-ocean">
              <Users className="size-6" />
            </div>
            <p className="font-display text-lg text-navy">No students found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {students.map((student) => (
            <Card key={student._id} className="border-2 border-border bg-card shadow-playful transition-colors hover:bg-aqua/20">
              <CardContent className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-4 p-4">
                {/* Student */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">
                    {getInitials(student.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold text-navy">{student.name}</p>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">@{student.username}</p>
                  </div>
                </div>

                {/* Grade */}
                <div className="min-w-0">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-ocean">Grade</p>
                  <p className="mt-1 truncate text-sm font-bold text-navy">Grade {student.gradeLevel}</p>
                </div>

                {/* Gender */}
                <div className="min-w-0">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-ocean">Gender</p>
                  <p className="mt-1 truncate text-sm font-bold text-navy">{formatGender(student.gender)}</p>
                </div>

                {/* Section */}
                <div className="min-w-0">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-ocean">Section</p>
                  <div className="mt-1">
                    <Badge className="rounded-lg bg-secondary/20 text-secondary-foreground hover:bg-secondary/20">
                      {formatSection(student.section)}
                    </Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 justify-end gap-2">
                  <Button  variant="outline" size="sm" className="w-[84px] rounded-xl border-border">
                    <Link href={`/teacher/students/${student._id}`} className="flex items-center justify-center gap-2">
                      <Eye className="size-4" />
                      View
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-[92px] rounded-xl border-border"
                    onClick={() => handleManageStudent(student)}
                  >
                    <Settings2 className="size-4" />
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 0 && (
        <div className="flex items-center justify-between border-t border-border pt-5">
          <p className="text-sm font-bold text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-border"
              onClick={() => setPage((current) => current - 1)}
              disabled={!pagination.hasPreviousPage}
            >
              <ChevronLeft className="size-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-border"
              onClick={() => setPage((current) => current + 1)}
              disabled={!pagination.hasNextPage}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      <StudentDialog student={selectedStudent} open={studentDialogOpen} onOpenChange={setStudentDialogOpen} />
    </div>
  );
}