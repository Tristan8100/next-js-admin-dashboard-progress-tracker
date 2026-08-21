import api from "@/lib/axios";
import { UpdateUserPayload, User } from "../types/user.types";

export async function getMyProfile(): Promise<User> {
  const response = await api.get("/users/find-my-profile");

  return response.data;
}

export async function updateMyProfile(
  payload: UpdateUserPayload,
): Promise<User> {
  const response = await api.patch(
    "/users/update-my-profile",
    payload,
  );

  return response.data;
}