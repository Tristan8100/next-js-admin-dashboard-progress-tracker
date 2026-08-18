export interface LoginRequest {
  email?: string;
  username?: string;
  password: string;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  section: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  status: string;
  user_info: UserInfo;
}