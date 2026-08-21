"use client";

import { useMutation } from "@tanstack/react-query";

import {
  requestPasswordReset,
  verifyResetCode,
  resetPassword,
} from "../api/password-reset.api";

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: requestPasswordReset,
  });
}

export function useVerifyResetCode() {
  return useMutation({
    mutationFn: verifyResetCode,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}