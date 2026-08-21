"use client";

import { useEffect, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { useVerifyResetCode } from "../hooks/use-password-reset";
import { getApiErrorMessage } from "@/lib/api-error";

export default function VerifyResetCodeForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const mutation = useVerifyResetCode();

  useEffect(() => {
    const storedEmail = localStorage.getItem(
      "password_reset_email",
    );

    if (!storedEmail) {
      router.replace("/auth/forgot-password");
      return;
    }

    setEmail(storedEmail);
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate(
      {
        email,
        otp,
      },
      {
        onSuccess: (data) => {
          if (!data.token) {
            return;
          }

          localStorage.setItem(
            "password_reset_token",
            data.token,
          );

          router.push("/auth/reset-password");
        },
      },
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-muted">
          <ShieldCheck className="size-5" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Verify your email
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Enter the 6-digit code sent to{" "}
          <span className="font-medium text-foreground">
            {email || "your email"}
          </span>
          .
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="otp"
            className="text-sm font-medium"
          >
            Verification code
          </label>

          <input
            id="otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            required
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value.replace(/\D/g, ""),
              )
            }
            placeholder="000000"
            className="h-12 w-full rounded-lg border bg-background px-3 text-center text-xl tracking-[0.4em] outline-none focus:ring-2 focus:ring-ring"
          />
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
            otp.length !== 6
          }
          className="flex h-10 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify code"
          )}
        </button>
      </form>
    </div>
  );
}