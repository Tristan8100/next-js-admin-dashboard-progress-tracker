import api from "@/lib/axios";
import {
  LoginRequest,
  LoginResponse,
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