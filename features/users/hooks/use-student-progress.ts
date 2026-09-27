import { useQuery } from "@tanstack/react-query";

import api from "@/lib/axios";

import { UserMap } from "../types/user.types";

function normalizeStudentMaps(payload: unknown): UserMap[] {
  if (Array.isArray(payload)) return payload as UserMap[];

  if (payload && typeof payload === "object") {
    const maybe = payload as {
      data?: unknown;
      maps?: unknown;
      studentMaps?: unknown;
      userMaps?: unknown;
    };

    if (Array.isArray(maybe.data)) return maybe.data as UserMap[];
    if (Array.isArray(maybe.maps)) return maybe.maps as UserMap[];
    if (Array.isArray(maybe.studentMaps)) return maybe.studentMaps as UserMap[];
    if (Array.isArray(maybe.userMaps)) return maybe.userMaps as UserMap[];
  }

  return [];
}

export function useStudentProgress(
  userId: string,
) {
  return useQuery<UserMap[]>({
    queryKey: ["student-progress", userId],
    queryFn: async () => {
      const response = await api.get<unknown>(
        `/users/${userId}/maps`,
      );

      return normalizeStudentMaps(response.data);
    },
    enabled: !!userId,
  });
}