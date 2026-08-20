import { useQuery } from "@tanstack/react-query";

import api from "@/lib/axios";

import { UserMap } from "../types/user.types";

export function useStudentProgress(
  userId: string,
) {
  return useQuery<UserMap[]>({
    queryKey: ["student-progress", userId],
    queryFn: async () => {
      const response = await api.get<UserMap[]>(
        `/users/${userId}/maps`,
      );

      return response.data;
    },
    enabled: !!userId,
  });
}