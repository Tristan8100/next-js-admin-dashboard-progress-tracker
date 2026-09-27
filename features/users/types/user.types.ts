export interface Student {
  _id: string;
  email: string;
  name: string;
  username: string;
  role: "user";
  coins: number;
  gradeLevel: number;
  section: string;
  gender: "BOY" | "GIRL" | null;
  batch?: number;
  active?: boolean;
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
  batch?: number;
  active?: boolean;
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
  gender?: "BOY" | "GIRL" | null;
}

export interface RegisterStudentRequest {
  name: string;
  username: string;
  password: string;
  section: string;
  gradeLevel: number;
  email?: string;
  gender: "BOY" | "GIRL";
  batch?: number;
  active?: boolean;
}

export interface UpdateStudentData {
  name?: string;
  username?: string;
  email?: string;
  gradeLevel?: number;
  section?: string;
  password?: string;
  batch?: number;
  active?: boolean;
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
  gender: "BOY" | "GIRL" | null;
  batch?: number;
  active?: boolean;
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
  batch?: number;
  active?: boolean;
}

export type ProgressType =
  | "level"
  | "tutorial"
  | "knowledge_check";

// export interface MapProgress {
//   type: ProgressType;
//   level?: number;
//   score?: number;
//   date_acquired: string;
// }

// export interface UserMap {
//   _id: string;
//   user_id: string;
//   name: string;
//   rank: number;
//   progress: MapProgress[];
//   created_at?: string;
//   updated_at?: string;
// }

export type MyProgressResponse = UserMap[];

export interface LeaderboardLastActivity {
  map_name: string;
  rank: number;
  type: ProgressType;
  level?: number;
  date_acquired: string;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  student_name: string;
  username: string;
  gradeLevel: number;
  section: string;
  totalScore: number;
  levelsCompleted: number;
  scoreRate: number;
  lastActivity: LeaderboardLastActivity;
}

export interface LeaderboardResponse {
  top: LeaderboardEntry[];
  bottom: LeaderboardEntry[];
}

export interface LeaderboardQuery {
  startDate?: string;
  endDate?: string;
}