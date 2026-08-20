import api from "@/lib/axios";
import { VerifyUserResponse } from "../types/user.types";

export async function verifyUser(): Promise<VerifyUserResponse> {
  const response = await api.get<VerifyUserResponse>(
    "/api/verify-user",
  );

  return response.data;
}