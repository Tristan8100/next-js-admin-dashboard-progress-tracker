export interface DashboardSummary {
  totalStudents: number;
  startedStudents: number;
  activeStudents: number;
  averageCompleted: number;
}

export interface RecentActivity {
  user_id: string;
  rank: number;
  student_name: string;
  username: string;
  map_name: string;
  type: string;
  level?: number;
  score?: number;
  date_acquired: string;
}

export interface RecentStudent {
  _id: string;
  name: string;
  username?: string;
  gradeLevel?: number;
  section?: string;
  created_at: string;
}

export interface StudentNeedingAttention {
  _id: string;
  name: string;
  username?: string;
  gradeLevel?: number;
  section?: string;
  reason?: string;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  recentActivity: RecentActivity[];
  recentStudents: RecentStudent[];
  studentsNeedingAttention: StudentNeedingAttention[];
}