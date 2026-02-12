import type { TokenConfig } from './types';

const defaultConfig: TokenConfig = {
  tokenKey: 'token',
  loginRoute: 'login',
  storage: localStorage,
};

class TokenService {
  private config: TokenConfig;

  constructor(config: Partial<TokenConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  // 获取 token
  getToken(): string | null {
    return this.config.storage.getItem(this.config.tokenKey);
  }

  // 设置 token
  setToken(token: string): void {
    this.config.storage.setItem(this.config.tokenKey, token);
  }

  // 移除 token
  removeToken(): void {
    this.config.storage.removeItem(this.config.tokenKey);
  }

  // 检查是否存在 token
  hasToken(): boolean {
    return !!this.getToken();
  }

  // 获取登录路由
  getLoginRoute(): string {
    return this.config.loginRoute;
  }
}

// 导出单例
export const tokenService = new TokenService();
export default tokenService;