import { http } from '@core/utils/request';

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
  phone?: string;
  isAdmin?: boolean;
}

export interface UpdateUserDto {
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  isAdmin?: boolean;
  isActive?: boolean;
}

export interface UserListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export const userApi = {
  getList: (params?: UserListParams) => http.get<User[]>('/users', { params }),
  getById: (id: number) => http.get<User>(`/users/${id}`),
  create: (data: CreateUserDto) => http.post<User>('/users', data),
  update: (id: number, data: UpdateUserDto) => http.patch<User>(`/users/${id}`, data),
  delete: (id: number) => http.delete(`/users/${id}`),
};