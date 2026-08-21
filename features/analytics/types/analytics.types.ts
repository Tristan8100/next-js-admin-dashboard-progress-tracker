export interface AnalyticsOverview {
  totalStudents: number;
  startedStudents: number;
  activeStudents: number;
  totalCompleted: number;
  averageCompleted: number;
}

export interface StudentsByGrade {
  gradeLevel: number;
  count: number;
}

export interface StudentsBySection {
  section: string;
  count: number;
}

export interface MapPerformance {
  rank: number;
  name: string;
  students: number;
  completed: number;
  averageScore: number;
}

export interface AnalyticsActivity {
  user_id: string;
  rank: number;
  map_name: string;
  student_name: string;
  username: string;
  type: "level" | "tutorial" | "knowledge_check";
  level?: number;
  score?: number;
  date_acquired: string;
}

export interface AnalyticsResponse {
  overview: AnalyticsOverview;
  studentsByGrade: StudentsByGrade[];
  studentsBySection: StudentsBySection[];
  mapPerformance: MapPerformance[];
  activity: AnalyticsActivity[];
}

export interface AnalyticsQuery {
  gradeLevel?: number;
  section?: string;
}