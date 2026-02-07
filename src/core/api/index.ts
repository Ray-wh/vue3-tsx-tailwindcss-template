import request from './request';

// 示例接口
export const api = {
  // 获取首页数据
  getHomeData: () => request.get('/home'),
  // 登录
  login: (data: { username: string; password: string }) =>
    request.post('/auth/login', data),
  // 获取用户信息
  getUserInfo: () => request.get('/user/info'),
};
