"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  Users,
} from "lucide-react";

import { useStudents } from "../hooks/use-students";
import { StudentQuery } from "../types/user.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import RegisterStudentDialog from "./register-student-dialog";
import StudentDialog from "./edit-student-dialog";
import { getApiErrorMessage } from "@/lib/api-error";

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [gradeLevel, setGradeLevel] =
    useState<string>("all");

  const [section, setSection] =
    useState<string>("all");

  const [page, setPage] = useState(1);

  const [selectedStudent, setSelectedStudent] =
    useState<any>(null);

  const [studentDialogOpen, setStudentDialogOpen] =
    useState(false);

  /*
   * Debounce server-side search
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /*
   * Query sent to the backend
   */
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
  };

  const {
    data,
    isLoading,
    isError,
    error,
  } = useStudents(query);

  const students = data?.data ?? [];
  const pagination = data?.pagination;

  /*
   * Handlers
   */
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleGradeChange = (
    value: string | null,
  ) => {
    setGradeLevel(value ?? "all");
    setPage(1);
  };

  const handleSectionChange = (
    value: string | null,
  ) => {
    setSection(value ?? "all");
    setPage(1);
  };

  const handleManageStudent = (
    student: (typeof students)[number],
  ) => {
    setSelectedStudent(student);
    setStudentDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Students
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage and view your students.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
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
          <div className="flex flex-col gap-3 md:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search by name, username, or email..."
                value={search}
                onChange={(event) =>
                  handleSearch(event.target.value)
                }
                className="pl-9"
              />
            </div>

            {/* Grade */}
            <Select
              value={gradeLevel}
              onValueChange={handleGradeChange}
            >
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Grade level" />
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
              onValueChange={handleSectionChange}
            >
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Section" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All sections
                </SelectItem>

                {["A", "B", "C", "D"].map(
                  (value) => (
                    <SelectItem
                      key={value}
                      value={value}
                    >
                      Section {value}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Student List
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {/* Loading */}
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : isError ? (
            /* Error */
            <div className="flex h-64 items-center justify-center">
              <p className="text-sm text-destructive">
                {getApiErrorMessage(error)}
              </p>
            </div>
          ) : students.length === 0 ? (
            /* Empty */
            <div className="flex h-64 flex-col items-center justify-center gap-2">
              <Users className="size-8 text-muted-foreground" />

              <p className="font-medium">
                No students found
              </p>

              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            /* Table */
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Student
                    </TableHead>

                    <TableHead>
                      Username
                    </TableHead>

                    <TableHead>
                      Grade
                    </TableHead>

                    <TableHead>
                      Section
                    </TableHead>

                    <TableHead>
                      Coins
                    </TableHead>

                    <TableHead>
                      Email
                    </TableHead>

                    <TableHead className="text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {students.map((student) => (
                    <TableRow
                      key={student._id}
                    >
                      {/* Student */}
                      <TableCell>
                        <Link
                          href={`/teacher/students/${student._id}`}
                          className="font-medium hover:underline"
                        >
                          {student.name}
                        </Link>
                      </TableCell>

                      {/* Username */}
                      <TableCell className="text-muted-foreground">
                        @{student.username}
                      </TableCell>

                      {/* Grade */}
                      <TableCell>
                        Grade {student.gradeLevel}
                      </TableCell>

                      {/* Section */}
                      <TableCell>
                        <Badge variant="secondary">
                          {student.section}
                        </Badge>
                      </TableCell>

                      {/* Coins */}
                      <TableCell>
                        {student.coins}
                      </TableCell>

                      {/* Email */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="max-w-[220px] truncate">
                            {student.email ||
                              "No email"}
                          </span>

                          {student.email_verified_at ? (
                            <Badge
                              variant="outline"
                              className="shrink-0"
                            >
                              Verified
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="shrink-0"
                            >
                              Unverified
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleManageStudent(
                              student,
                            )
                          }
                        >
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {pagination &&
            pagination.totalPages > 0 && (
              <div className="flex items-center justify-between border-t px-4 py-3">
                <p className="text-sm text-muted-foreground">
                  Page {pagination.page} of{" "}
                  {pagination.totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setPage(
                        (current) =>
                          current - 1,
                      )
                    }
                    disabled={
                      !pagination.hasPreviousPage
                    }
                  >
                    <ChevronLeft className="size-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setPage(
                        (current) =>
                          current + 1,
                      )
                    }
                    disabled={
                      !pagination.hasNextPage
                    }
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
        </CardContent>
      </Card>

      {/* Student Management Dialog */}
      <StudentDialog
        student={selectedStudent}
        open={studentDialogOpen}
        onOpenChange={setStudentDialogOpen}
      />
    </div>
  );
}