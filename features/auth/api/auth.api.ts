import api from "@/lib/axios";

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth.types";

export const login = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/api/login",
    data,
  );

  return response.data;
};

export const register = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/api/register",
    data,
  );

  return response.data;
};

import type {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../types/auth.types";

export const verifyOtp = async (
  data: VerifyOtpRequest,
): Promise<VerifyOtpResponse> => {
  const response = await api.post<VerifyOtpResponse>(
    "/api/verify-otp",
    data,
  );

  return response.data;
};

export const sendOtp = async (
  data: SendOtpRequest,
): Promise<SendOtpResponse> => {
  const response = await api.post<SendOtpResponse>(
    "/api/send-otp",
    data,
  );

  return response.data;
};