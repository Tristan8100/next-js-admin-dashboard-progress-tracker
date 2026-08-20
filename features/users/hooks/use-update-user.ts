import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUser } from "../api/users.api";
import { UpdateStudentData } from "../types/user.types";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateStudentData;
    }) => updateUser(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
}