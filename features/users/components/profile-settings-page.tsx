"use client";

import { useEffect, useState } from "react";
import { Loader2, LogOut, Save } from "lucide-react";

import {
  useMyProfile,
  useUpdateMyProfile,
} from "../hooks/use-my-profile";

import { getApiErrorMessage } from "@/lib/api-error";
import { useLogout } from "@/features/auth/hooks/use-logout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfilePage() {
  const { logout } = useLogout();
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useMyProfile();

  const updateMutation = useUpdateMyProfile();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [section, setSection] = useState("");
  const [password, setPassword] = useState("");

  /*
   * Auto-fill form after GET /find-my-profile
   */
  useEffect(() => {
    if (!profile) return;

    setName(profile.name ?? "");
    setUsername(profile.username ?? "");
    setEmail(profile.email ?? "");
    setGradeLevel(
      profile.gradeLevel?.toString() ?? "",
    );
    setSection(profile.section ?? "");
  }, [profile]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const payload = {
      name: name.trim(),
      username: username.trim(),
      email: email.trim() || undefined,
      gradeLevel: gradeLevel
        ? Number(gradeLevel)
        : undefined,
      section: section.trim(),
      ...(password
        ? {
            password,
          }
        : {}),
    };

    updateMutation.mutate(payload, {
      onSuccess: () => {
        setPassword("");
      },
    });
  };

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
          {getApiErrorMessage(error)}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          My Profile
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your account information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Name
              </label>

              <Input
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Username
              </label>

              <Input
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                placeholder="Username"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Email
              </label>

              <Input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Email"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Grade Level
                </label>

                <Input
                  type="number"
                  min={1}
                  value={gradeLevel}
                  onChange={(event) =>
                    setGradeLevel(event.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Section
                </label>

                <Input
                  value={section}
                  onChange={(event) =>
                    setSection(event.target.value)
                  }
                  placeholder="Section"
                />
              </div>
            </div>

            <div className="border-t pt-5">
              <div className="mb-3">
                <h3 className="text-sm font-medium">
                  Change Password
                </h3>

                <p className="text-xs text-muted-foreground">
                  Leave blank if you don't want to change
                  your password.
                </p>
              </div>

              <Input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="New password"
              />
            </div>

            {updateMutation.isError && (
              <p className="text-sm text-destructive">
                {getApiErrorMessage(
                  updateMutation.error,
                )}
              </p>
            )}

            {updateMutation.isSuccess && (
              <p className="text-sm text-green-600">
                Profile updated successfully.
              </p>
            )}

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
        </CardHeader>

        <CardContent>
          <Button
            type="button"
            variant="destructive"
            onClick={logout}
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
