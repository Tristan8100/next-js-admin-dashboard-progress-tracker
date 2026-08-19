"use client";

import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../api/auth.api";

export const useSendOtp = () => {
  return useMutation({
    mutationFn: sendOtp,
  });
};