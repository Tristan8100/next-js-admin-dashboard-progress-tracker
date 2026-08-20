"use client";

import { useQuery } from "@tanstack/react-query";

import { getStudents } from "../api/users.api";
import { StudentQuery } from "../types/user.types";

export const useStudents = (query?: StudentQuery) => {
  return useQuery({
    queryKey: ["students", query],
    queryFn: () => getStudents(query),
  });
};