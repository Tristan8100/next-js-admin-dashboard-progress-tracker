"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { useRequestPasswordReset } from "../hooks/use-password-reset";
import { getApiErrorMessage } from "@/lib/api-error";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const mutation = useRequestPasswordReset();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate(
      { email },
      {
        onSuccess: () => {
          localStorage.setItem(
            "password_reset_email",
            email,
          );

          router.push("/auth/forgot-password-token");
        },
      },
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-muted">
          <Mail className="size-5" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot password?
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email and we'll send you a verification
          code.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {mutation.isError && (
          <p className="text-sm text-destructive">
            {getApiErrorMessage(mutation.error)}
          </p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="flex h-10 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending code...
            </>
          ) : (
            "Send verification code"
          )}
        </button>
      </form>
    </div>
  );
}