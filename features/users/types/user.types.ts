export interface Student {
  _id: string;
  email: string;
  name: string;
  username: string;
  role: "user";
  coins: number;
  gradeLevel: number;
  section: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudentsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface StudentsResponse {
  data: Student[];
  pagination: StudentsPagination;
}

export interface StudentQuery {
  search?: string;
  gradeLevel?: number;
  section?: string;
  page?: number;
  limit?: number;
  sortBy?:
    | "name"
    | "username"
    | "email"
    | "gradeLevel"
    | "section"
    | "coins"
    | "created_at"
    | "updated_at";
  sortOrder?: "asc" | "desc";
}

export interface RegisterStudentRequest {
  name: string;
  username: string;
  password: string;
  section: string;
  gradeLevel: number;
  email?: string;
}

export interface UpdateStudentData {
  name?: string;
  username?: string;
  email?: string;
  gradeLevel?: number;
  section?: string;
  password?: string;
}

export type MapProgress = {
  type: "level" | "tutorial" | "knowledge_check";
  level?: number;
  score?: number;
  date_acquired: string;
};

export type UserMap = {
  _id: string;
  user_id: string;
  name: string;
  rank: number;
  progress: MapProgress[];
  created_at: string;
  updated_at: string;
};

export interface VerifyUserResponse {
  message: string;
  user_info: {
    id: string;
    name: string;
    email: string;
  };
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email?: string | null;
  role: "admin" | "user";
  coins: number;
  gradeLevel: number;
  section: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserPayload {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  gradeLevel?: number;
  section?: string;
}