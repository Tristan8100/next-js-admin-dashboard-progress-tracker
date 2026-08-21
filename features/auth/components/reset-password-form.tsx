"use client";

import { useEffect, useState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

import { useResetPassword } from "../hooks/use-password-reset";
import { getApiErrorMessage } from "@/lib/api-error";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const mutation = useResetPassword();

  useEffect(() => {
    const storedEmail = localStorage.getItem(
      "password_reset_email",
    );

    const storedToken = localStorage.getItem(
      "password_reset_token",
    );

    if (!storedEmail || !storedToken) {
      router.replace("/auth/forgot-password");
      return;
    }

    setEmail(storedEmail);
    setToken(storedToken);
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    mutation.mutate(
      {
        email,
        token,
        password,
      },
      {
        onSuccess: () => {
          localStorage.removeItem(
            "password_reset_token",
          );

          localStorage.removeItem(
            "password_reset_email",
          );

          router.push("/auth/login");
        },
      },
    );
  }

  const passwordsMatch =
    password === confirmPassword;

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-muted">
          <LockKeyhole className="size-5" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Create a new password
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Choose a new password for your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium"
          >
            New password
          </label>

          <input
            id="password"
            type="password"
            minLength={8}
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="At least 8 characters"
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium"
          >
            Confirm password
          </label>

          <input
            id="confirmPassword"
            type="password"
            minLength={8}
            required
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            placeholder="Repeat your password"
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />

          {confirmPassword &&
            !passwordsMatch && (
              <p className="text-xs text-destructive">
                Passwords do not match.
              </p>
            )}
        </div>

        {mutation.isError && (
          <p className="text-sm text-destructive">
            {getApiErrorMessage(mutation.error)}
          </p>
        )}

        <button
          type="submit"
          disabled={
            mutation.isPending ||
            password.length < 8 ||
            !passwordsMatch
          }
          className="flex h-10 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Resetting password...
            </>
          ) : (
            "Reset password"
          )}
        </button>
      </form>
    </div>
  );
}