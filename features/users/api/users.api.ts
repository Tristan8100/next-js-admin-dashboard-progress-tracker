import api from "@/lib/axios";

import {
  StudentQuery,
  StudentsResponse,
} from "../types/user.types";

export const getStudents = async (
  query?: StudentQuery,
): Promise<StudentsResponse> => {
  const response = await api.get<StudentsResponse>(
    "/users/students",
    {
      params: query,
    },
  );

  return response.data;
};