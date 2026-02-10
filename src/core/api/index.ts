import request from './request';

/**
 * 用户类型定义
 */
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

/**
 * 创建用户参数
 */
export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
  phone?: string;
  isAdmin?: boolean;
}

/**
 * 更新用户参数
 */
export interface UpdateUserDto {
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  isAdmin?: boolean;
  isActive?: boolean;
}

// 示例接口
export const api = {
  // 获取首页数据
  getHomeData: () => request.get('/home'),
  // 登录
  login: (data: { username: string; password: string }) =>
    request.post('/auth/login', data),
  // 获取用户信息
  getUserInfo: () => request.get('/user/info'),
  
  // ========== 用户相关接口 ==========
  
  // 获取所有用户
  getUsers: () => request.get<User[]>('/users'),
  
  // 获取指定用户
  getUser: (id: number) => request.get<User>(`/users/${id}`),
  
  // 创建用户
  createUser: (data: CreateUserDto) => request.post<User>('/users', data),
  
  // 更新用户
  updateUser: (id: number, data: UpdateUserDto) =>
    request.patch<User>(`/users/${id}`, data),
  
  // 删除用户
  deleteUser: (id: number) => request.delete(`/users/${id}`),
};
