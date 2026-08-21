import api from "@/lib/axios";

import {
  StudentQuery,
  StudentsResponse,
  RegisterStudentRequest,
  Student,
  UpdateStudentData,
  MyProgressResponse,
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


export const registerStudent = async (
  data: RegisterStudentRequest,
): Promise<Student> => {
  const response = await api.post<Student>(
    "/users/register-student",
    data,
  );

  return response.data;
};

export async function updateUser(
  id: string,
  data: UpdateStudentData,
) {
  const response = await api.patch(
    `/users/${id}`,
    data,
  );

  return response.data;
}

export async function deleteUser(id: string) {
  const response = await api.delete(`/users/${id}`);

  return response.data;
}

export async function getMyProgress(): Promise<MyProgressResponse> {
  const response = await api.get<MyProgressResponse>(
    "/user-maps/my-progress",
  );

  return response.data;
}