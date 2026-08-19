"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useRegister } from "../hooks/use-register";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getApiErrorMessage } from "@/lib/api-error";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate: register,
    isPending,
    error,
  } = useRegister();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    register(
      {
        name,
        email,
        username,
        password,
      },
      {
        onSuccess: (data) => {
        //   localStorage.setItem(
        //     "verification_code",
        //     data.code,
        //   );

          localStorage.setItem(
            "verification_email",
            data.email,
          );

          router.push("/auth/verify-email");
        },
      },
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">
            Create an account
          </h1>

          <p className="text-sm text-muted-foreground">
            Register a new account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="name">
              Name
            </Label>

            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              disabled={isPending}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              disabled={isPending}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">
              Username
            </Label>

            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
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
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              disabled={isPending}
              minLength={8}
              required
            />

            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters.
            </p>
          </div>

          {error && (
            <p className="text-sm text-destructive">
              {getApiErrorMessage(error)}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending
              ? "Creating account..."
              : "Create account"}
          </Button>
        </form>
      </div>
    </main>
  );
}