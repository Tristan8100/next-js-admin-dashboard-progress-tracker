"use client";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";

import { useRegisterStudent } from "../hooks/use-register-student";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getApiErrorMessage } from "@/lib/api-error";

export default function RegisterStudentDialog() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [section, setSection] = useState("");

  const {
    mutate: registerStudent,
    isPending,
    error,
  } = useRegisterStudent();

  const resetForm = () => {
    setName("");
    setUsername("");
    setPassword("");
    setEmail("");
    setGradeLevel("");
    setSection("");
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    registerStudent(
      {
        name: name.trim(),
        username: username.trim(),
        password,
        section,
        gradeLevel: Number(gradeLevel),
        ...(email.trim()
          ? { email: email.trim() }
          : {}),
      },
      {
        onSuccess: () => {
          resetForm();
          setOpen(false);
        },
      },
    );
  };

  const errorMessage = getApiErrorMessage(error);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isPending) {
          setOpen(value);
        }
      }}
    >
      <DialogTrigger
        className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
        >
          <Plus className="mr-2 size-4" />
          Add Student
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>

          <DialogDescription>
            Create a student account and assign their
            grade level and section.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="student-name">
              Full Name
            </Label>

            <Input
              id="student-name"
              placeholder="Juan Dela Cruz"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              disabled={isPending}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="student-username">
              Username
            </Label>

            <Input
              id="student-username"
              placeholder="juandelacruz"
              value={username}
              onChange={(event) =>
                setUsername(
                  event.target.value.replace(
                    /[^a-zA-Z0-9_.]/g,
                    "",
                  ),
                )
              }
              disabled={isPending}
              minLength={3}
              required
            />

            <p className="text-xs text-muted-foreground">
              Letters, numbers, underscores, and periods
              only.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="student-password">
              Initial Password
            </Label>

            <Input
              id="student-password"
              type="password"
              placeholder="Enter initial password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              disabled={isPending}
              minLength={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="student-email">
              Email
              <span className="ml-1 text-muted-foreground">
                (Optional)
              </span>
            </Label>

            <Input
              id="student-email"
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              disabled={isPending}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Grade Level</Label>

              <Select
                value={gradeLevel}
                onValueChange={(value) =>
                  setGradeLevel(value ?? "")
                }
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>

                <SelectContent>
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
            </div>

            <div className="space-y-2">
              <Label>Section</Label>

              <Select
                value={section}
                onValueChange={(value) =>
                  setSection(value ?? "")
                }
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>

                <SelectContent>
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
          </div>

          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2">
              <p className="text-sm text-destructive">
                {errorMessage}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isPending ||
                !name.trim() ||
                !username.trim() ||
                !password ||
                !gradeLevel ||
                !section
              }
            >
              {isPending && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}

              {isPending
                ? "Creating..."
                : "Create Student"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}