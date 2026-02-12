import { http } from '@/core/http';

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  email: string;
  phone?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
  };
}

export const authApi = {
  login: (data: LoginDto) => http.post<LoginResponse>('/auth/login', data),
  register: (data: RegisterDto) => http.post<LoginResponse>('/auth/register', data),
  logout: () => http.post('/auth/logout'),
  getUserInfo: () => http.get('/auth/me'),
  refreshToken: () => http.post<{ token: string }>('/auth/refresh'),
};