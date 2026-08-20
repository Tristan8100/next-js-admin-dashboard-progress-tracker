"use client";

import { useEffect, useState } from "react";
import { Loader2, Pencil, Trash2 } from "lucide-react";

import { useUpdateUser } from "../hooks/use-update-user";
import { useDeleteUser } from "../hooks/use-delete-user";
import { UpdateStudentData } from "../types/user.types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

interface Student {
  _id: string;
  name: string;
  username: string;
  email?: string | null;
  gradeLevel: number;
  section: string;
  coins: number;
  email_verified_at?: string | null;
}

interface StudentDialogProps {
  student: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function StudentDialog({
  student,
  open,
  onOpenChange,
}: StudentDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [section, setSection] = useState("");
  const [password, setPassword] = useState("");

  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  useEffect(() => {
    if (!student) return;

    setName(student.name);
    setUsername(student.username);
    setEmail(student.email ?? "");
    setGradeLevel(String(student.gradeLevel));
    setSection(student.section);
    setPassword("");

    setIsEditing(false);
    setShowDeleteConfirm(false);
  }, [student]);

  if (!student) return null;

  const handleUpdate = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const data: UpdateStudentData = {
      name: name.trim(),
      username: username.trim(),
      gradeLevel: Number(gradeLevel),
      section,
    };

    if (email.trim()) {
      data.email = email.trim();
    }

    if (password.trim()) {
      data.password = password;
    }

    updateMutation.mutate(
      {
        id: student._id,
        data,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          setPassword("");
        },
      },
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(student._id, {
      onSuccess: () => {
        setShowDeleteConfirm(false);
        onOpenChange(false);
      },
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing
                ? "Edit Student"
                : "Student Details"}
            </DialogTitle>

            <DialogDescription>
              {isEditing
                ? "Update the student's account information."
                : "View the student's account information."}
            </DialogDescription>
          </DialogHeader>

          {isEditing ? (
            <form
              onSubmit={handleUpdate}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="student-name">
                  Full Name
                </Label>

                <Input
                  id="student-name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  disabled={updateMutation.isPending}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-username">
                  Username
                </Label>

                <Input
                  id="student-username"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  disabled={updateMutation.isPending}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-email">
                  Email
                </Label>

                <Input
                  id="student-email"
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  disabled={updateMutation.isPending}
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
                    disabled={updateMutation.isPending}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                    disabled={updateMutation.isPending}
                  >
                    <SelectTrigger>
                      <SelectValue />
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

              <div className="space-y-2">
                <Label htmlFor="student-password">
                  New Password
                </Label>

                <Input
                  id="student-password"
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  disabled={updateMutation.isPending}
                />

                <p className="text-xs text-muted-foreground">
                  Leave blank if you don't want to change
                  the password.
                </p>
              </div>

              {updateMutation.isError && (
                <p className="text-sm text-destructive">
                    {getApiErrorMessage(updateMutation.error)}
                </p>
               )}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={updateMutation.isPending}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}

                  {updateMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Full Name
                  </p>

                  <p className="mt-1 font-medium">
                    {student.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Username
                  </p>

                  <p className="mt-1 font-medium">
                    @{student.username}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Email
                </p>

                <p className="mt-1">
                  {student.email || "No email"}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Grade
                  </p>

                  <p className="mt-1 font-medium">
                    Grade {student.gradeLevel}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Section
                  </p>

                  <p className="mt-1 font-medium">
                    {student.section}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Coins
                  </p>

                  <p className="mt-1 font-medium">
                    {student.coins}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() =>
                    setShowDeleteConfirm(true)
                  }
                >
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </Button>

                <Button
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="mr-2 size-4" />
                  Edit Student
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              Delete Student?
            </DialogTitle>

            <DialogDescription>
              This will permanently delete{" "}
              <span className="font-medium text-foreground">
                {student.name}
              </span>
              's account. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {deleteMutation.isError && (
            <p className="text-sm text-destructive">
              Failed to delete student.
            </p>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setShowDeleteConfirm(false)
              }
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}

              {deleteMutation.isPending
                ? "Deleting..."
                : "Delete Student"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}