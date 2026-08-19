"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";

import { useLogin } from "../hooks/use-login";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getApiErrorMessage } from "@/lib/api-error";

export default function LoginForm() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    mutate: login,
    isPending,
    error,
  } = useLogin();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const isEmail = identifier.includes("@");

    login(
      {
        ...(isEmail
          ? { email: identifier }
          : { username: identifier }),
        password,
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);

          if (data.user_info.role === "admin") {
            router.push("/teacher/dashboard");
          } else {
            router.push("/student/dashboard");
          }
        },
      },
    );
  };

  const errorMessage = getApiErrorMessage(error);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
            <LockKeyhole className="size-6 text-primary" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl">
              Welcome back
            </CardTitle>

            <CardDescription>
              Sign in to your account to continue.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="identifier">
                Email or Username
              </Label>

              <Input
                id="identifier"
                type="text"
                placeholder="Enter your email or username"
                value={identifier}
                onChange={(event) =>
                  setIdentifier(event.target.value)
                }
                disabled={isPending}
                autoComplete="username"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  Password
                </Label>

                <button
                  type="button"
                  onClick={() =>
                    router.push("/auth/forgot-password")
                  }
                  disabled={isPending}
                  className="text-sm text-muted-foreground hover:text-primary hover:underline disabled:pointer-events-none disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={
                    showPassword ? "text" : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  disabled={isPending}
                  autoComplete="current-password"
                  className="pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  disabled={isPending}
                  className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2">
                <p className="text-sm text-destructive">
                  {errorMessage}
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}

              {isPending
                ? "Logging in..."
                : "Login"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>

              <button
                type="button"
                onClick={() =>
                  router.push("/auth/register")
                }
                disabled={isPending}
                className="font-medium text-primary hover:underline disabled:pointer-events-none disabled:opacity-50"
              >
                Create an account
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}