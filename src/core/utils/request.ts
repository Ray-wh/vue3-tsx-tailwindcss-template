import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipErrorHandler?: boolean;
}

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const request: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !(config as RequestConfig).skipAuth) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleError = (error: any) => {
  const { response, config } = error;

  if ((config as RequestConfig)?.skipErrorHandler) {
    return Promise.reject(error);
  }

  const errorMessages: Record<number, string> = {
    401: '登录已过期，请重新登录',
    403: '没有权限访问该资源',
    404: '请求的资源不存在',
    500: '服务器内部错误',
  };

  const status = response?.status;
  if (status && errorMessages[status]) {
    console.error(errorMessages[status]);

    if (status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  }

  return Promise.reject(error);
};

request.interceptors.response.use((response) => response.data, handleError);

const createMethod =
  (method: string) =>
  <T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> =>
    (request as any)[method](url, data, config);

export const get = createMethod('get');
export const post = createMethod('post');
export const put = createMethod('put');
export const patch = createMethod('patch');
export const del = createMethod('delete');

export const http = { get, post, put, patch, delete: del };

export default http;
