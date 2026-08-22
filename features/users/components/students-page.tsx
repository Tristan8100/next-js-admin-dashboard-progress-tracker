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

  return trimmed.toLowerCase().startsWith("section")
    ? trimmed
    : `Section ${trimmed}`;
}

function formatGender(
  gender: "BOY" | "GIRL" | null | undefined,
) {
  if (!gender) return "—";

  return gender === "BOY" ? "Boy" : "Girl";
}

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [gradeLevel, setGradeLevel] = useState("all");
  const [section, setSection] = useState("all");
  const [gender, setGender] = useState("all");

  const [page, setPage] = useState(1);

  const [selectedStudent, setSelectedStudent] =
    useState<any>(null);

  const [studentDialogOpen, setStudentDialogOpen] =
    useState(false);

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

    ...(debouncedSearch.trim()
      ? {
          search: debouncedSearch.trim(),
        }
      : {}),

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

    ...(gender !== "all"
      ? {
          gender: gender as "BOY" | "GIRL",
        }
      : {}),
  };

  const {
    data,
    isLoading,
    isError,
    error,
  } = useStudents(query);

  const students = data?.data ?? [];
  const pagination = data?.pagination;

  const handleManageStudent = (
    student: (typeof students)[number],
  ) => {
    setSelectedStudent(student);
    setStudentDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Students
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage and view your students.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4" />

            <span>
              {pagination?.total ?? 0} students
            </span>
          </div>

          <RegisterStudentDialog />
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search by name or username..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                className="pl-9"
              />
            </div>

            {/* Grade */}
            <Select
              value={gradeLevel}
              onValueChange={(value) => {
                if (value === null) return;

                setGradeLevel(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All grades
                </SelectItem>

                {Array.from(
                  { length: 12 },
                  (_, index) => index + 1,
                ).map((grade) => (
                  <SelectItem
                    key={grade}
                    value={String(grade)}
                  >
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Section */}
            <Select
              value={section}
              onValueChange={(value) => {
                if (value === null) return;

                setSection(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All sections
                </SelectItem>

                {["A", "B", "C", "D"].map((value) => (
                  <SelectItem
                    key={value}
                    value={value}
                  >
                    Section {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Gender */}
            <Select
              value={gender}
              onValueChange={(value) => {
                if (value === null) return;

                setGender(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All genders
                </SelectItem>

                <SelectItem value="BOY">
                  Boy
                </SelectItem>

                <SelectItem value="GIRL">
                  Girl
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Student Cards */}
      {isLoading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : isError ? (
        <div className="flex h-48 items-center justify-center">
          <p className="text-sm text-destructive">
            {getApiErrorMessage(error)}
          </p>
        </div>
      ) : students.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-lg border border-dashed">
          <Users className="size-8 text-muted-foreground" />

          <p className="font-medium">
            No students found
          </p>

          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {students.map((student) => (
            <Card
              key={student._id}
              className="transition-colors hover:bg-muted/20"
            >
              <CardContent className="flex items-center p-4">
                {/* Student */}
                <div className="w-[32%] shrink-0">
                  <p className="font-medium">
                    {student.name}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    @{student.username}
                  </p>
                </div>

                {/* Grade */}
                <div className="w-[14%] shrink-0">
                  <p className="text-xs text-muted-foreground">
                    Grade
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    Grade {student.gradeLevel}
                  </p>
                </div>

                {/* Gender */}
                <div className="w-[12%] shrink-0">
                  <p className="text-xs text-muted-foreground">
                    Gender
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {formatGender(student.gender)}
                  </p>
                </div>

                {/* Section */}
                <div className="w-[17%] shrink-0">
                  <p className="text-xs text-muted-foreground">
                    Section
                  </p>

                  <div className="mt-1">
                    <Badge variant="secondary">
                      {formatSection(student.section)}
                    </Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex w-[25%] shrink-0 justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-[84px]"
                  >
                    <Link
                      href={`/teacher/students/${student._id}`}
                      className="flex items-center justify-center gap-2"
                    >
                      <Eye className="size-4" />
                      View
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-[84px]"
                    onClick={() =>
                      handleManageStudent(student)
                    }
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
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Page {pagination.page} of{" "}
            {pagination.totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setPage((current) => current - 1)
              }
              disabled={!pagination.hasPreviousPage}
            >
              <ChevronLeft className="size-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setPage((current) => current + 1)
              }
              disabled={!pagination.hasNextPage}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      <StudentDialog
        student={selectedStudent}
        open={studentDialogOpen}
        onOpenChange={setStudentDialogOpen}
      />
    </div>
  );
}