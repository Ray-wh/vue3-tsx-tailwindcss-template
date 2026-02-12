import type { AxiosInstance } from 'axios';
import tokenService from '@/core/token';
import type { RequestConfig } from './types';

export function setupRequestInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      const token = tokenService.getToken();
      if (token && !(config as RequestConfig).skipAuth) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}