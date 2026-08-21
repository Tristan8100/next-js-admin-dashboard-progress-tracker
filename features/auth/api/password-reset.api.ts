import axios from "@/lib/axios";

import {
  SendOtpPayload,
  VerifyResetCodePayload,
  ResetPasswordPayload,
  PasswordResetResponse,
} from "../types/auth.types";

export async function requestPasswordReset(
  data: SendOtpPayload,
): Promise<PasswordResetResponse> {
  const response = await axios.post<PasswordResetResponse>(
    "/api/forgot-password",
    data,
  );

  return response.data;
}

export async function verifyResetCode(
  data: VerifyResetCodePayload,
): Promise<PasswordResetResponse> {
  const response = await axios.post<PasswordResetResponse>(
    "/api/forgot-password-token",
    data,
  );

  return response.data;
}

export async function resetPassword(
  data: ResetPasswordPayload,
): Promise<PasswordResetResponse> {
  const response = await axios.post<PasswordResetResponse>(
    "/api/reset-password",
    data,
  );

  return response.data;
}