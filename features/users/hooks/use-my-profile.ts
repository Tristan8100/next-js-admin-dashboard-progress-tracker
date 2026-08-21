import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMyProfile,
  updateMyProfile,
} from "../api/profile.api";

import { UpdateUserPayload } from "../types/user.types";

export function useMyProfile() {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
  });
}

export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserPayload) =>
      updateMyProfile(payload),

    onSuccess: (data) => {
      queryClient.setQueryData(
        ["my-profile"],
        data,
      );
    },
  });
}