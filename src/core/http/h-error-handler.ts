import type { AxiosInstance } from 'axios';
import tokenService from '@/core/token';
import router from '@/core/router';
import type { RequestConfig } from './types';

const errorMessages: Record<number, string> = {
  401: '登录已过期，请重新登录',
  403: '没有权限访问该资源',
  404: '请求的资源不存在',
  500: '服务器内部错误',
};

export function handleError(error: any) {
  const { response, config } = error;

  if ((config as RequestConfig)?.skipErrorHandler) {
    return Promise.reject(error);
  }

  const status = response?.status;
  if (status && errorMessages[status]) {
    console.error(errorMessages[status]);

    if (status === 401) {
      tokenService.removeToken();
      const loginRoute = tokenService.getLoginRoute();
      if (router.currentRoute.value.name !== loginRoute) {
        router.push({ name: loginRoute });
      }
    }
  }

  return Promise.reject(error);
}

export function setupErrorInterceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response.data,
    handleError
  );
}