import { request } from './h-config';
import { setupRequestInterceptors } from './h-interceptors';
import { setupErrorInterceptors } from './h-error-handler';
import { createHttpMethods } from './h-methods';
export type { RequestConfig } from './types';

setupRequestInterceptors(request);
setupErrorInterceptors(request);

const { get, post, put, patch, delete: del } = createHttpMethods(request);

export const http = { get, post, put, patch, delete: del };
export { get, post, put, patch, del };
export default http;
