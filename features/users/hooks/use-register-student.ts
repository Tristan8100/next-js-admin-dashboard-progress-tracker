"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { registerStudent } from "../api/users.api";

export const useRegisterStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerStudent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
};