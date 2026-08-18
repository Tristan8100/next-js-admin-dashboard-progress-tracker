"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLogin } from "../hooks/use-login";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate: login,
    isPending,
    error,
  } = useLogin();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

          router.push("/dashboard");
        },
      },
    );
  };

  const errorMessage =
    error &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response
      ? (error.response as { data?: { message?: string } }).data
          ?.message
      : "Invalid username/email or password.";

  return (
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
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          Password
        </Label>

        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          disabled={isPending}
          required
        />
      </div>

      {error && (
        <p className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}