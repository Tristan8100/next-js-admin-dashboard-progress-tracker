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

export interface RegisterRequest {
  email: string;
  name: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  email: string;
  code: string;
}


export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
}


export interface SendOtpRequest {
  email: string;
}

export interface SendOtpResponse {
  message: string;
}