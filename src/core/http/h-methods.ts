import type { AxiosInstance } from 'axios';
import type { RequestConfig } from './types';

export function createHttpMethods(instance: AxiosInstance) {
  const createMethod =
    (method: string) =>
    <T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> =>
      (instance as any)[method](url, data, config);

  return {
    get: createMethod('get'),
    post: createMethod('post'),
    put: createMethod('put'),
    patch: createMethod('patch'),
    delete: createMethod('delete'),
  };
}