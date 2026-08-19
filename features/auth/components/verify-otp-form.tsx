"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useVerifyOtp } from "../hooks/use-verify-otp";
import { useSendOtp } from "../hooks/use-send-otp";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VerifyOtpForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const verifyOtpMutation = useVerifyOtp();
  const sendOtpMutation = useSendOtp();

  useEffect(() => {
    const verificationEmail =
      localStorage.getItem("verification_email") ?? "";

    setEmail(verificationEmail);
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendCooldown((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    verifyOtpMutation.mutate(
      {
        email,
        otp,
      },
      {
        onSuccess: () => {
          localStorage.removeItem("verification_email");
          router.push("/auth/login");
        },
      },
    );
  };

  const handleResend = () => {
    if (!email || resendCooldown > 0) {
      return;
    }

    sendOtpMutation.mutate(
      {
        email,
      },
      {
        onSuccess: () => {
          setOtp("");
          setResendCooldown(60);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>

          <CardDescription>
            Enter the 6-digit OTP sent to your email.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                value={email}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">OTP</Label>

              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                placeholder="123456"
                required
              />
            </div>

            {verifyOtpMutation.isError && (
              <p className="text-sm text-destructive">
                Verification failed. Please check your OTP and try again.
              </p>
            )}

            {sendOtpMutation.isError && (
              <p className="text-sm text-destructive">
                Failed to resend OTP. Please try again.
              </p>
            )}

            {sendOtpMutation.isSuccess && (
              <p className="text-sm text-green-600">
                A new OTP has been sent to your email.
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={
                verifyOtpMutation.isPending ||
                otp.length !== 6
              }
            >
              {verifyOtpMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              {verifyOtpMutation.isPending
                ? "Verifying..."
                : "Verify Email"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={handleResend}
                disabled={
                  sendOtpMutation.isPending ||
                  resendCooldown > 0 ||
                  !email
                }
                className="px-0"
              >
                {sendOtpMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : resendCooldown > 0 ? (
                  `Resend OTP in ${resendCooldown}s`
                ) : (
                  "Resend OTP"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}