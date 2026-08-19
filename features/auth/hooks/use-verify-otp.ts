"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../api/auth.api";

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
  });
};