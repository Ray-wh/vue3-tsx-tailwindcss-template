import * as Sentry from '@sentry/vue'
import type { App } from 'vue'

// 初始化Sentry
export function initSentry(app: App, router: any) {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (dsn) {
    Sentry.init({
      app, // Vue 应用实例
      dsn, // Sentry DSN (数据源名称)
      sendDefaultPii: true, // 发送默认的个人身份信息
      integrations: [
        Sentry.browserTracingIntegration({ router }), // 浏览器追踪集成，自动追踪路由变化
        Sentry.replayIntegration() // 会话重放集成，记录用户操作和页面状态
      ],
      tracesSampleRate: 1.0, // 事务采样率 (1.0 = 100%)
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/], // 追踪传播目标
      replaysSessionSampleRate: 0.1, // 会话重放采样率 (0.1 = 10%)
      replaysOnErrorSampleRate: 1.0, // 错误时会话重放采样率 (1.0 = 100%)
      enableLogs: true // 启用日志记录
    })
  }
}

// 捕获错误
export function captureError(error: any, context?: any) {
  Sentry.captureException(error, {
    contexts: context ? { ...context } : undefined,
  })
}

// 捕获消息
export function captureMessage(message: string, level?: any) {
  Sentry.captureMessage(message, level)
}

// 设置用户信息
export function setUser(user: any) {
  Sentry.setUser(user)
}

// 清除用户信息
export function clearUser() {
  Sentry.setUser(null)
}

// 设置标签
export function setTag(key: string, value: string) {
  Sentry.setTag(key, value)
}

// 设置额外信息
export function setExtra(key: string, value: any) {
  Sentry.setExtra(key, value)
}

// 检查 Sentry 是否初始化
export function isSentryInitialized() {
  return Sentry.isInitialized()
}

export default {
  init: initSentry,
  captureError,
  captureMessage,
  setUser,
  clearUser,
  setTag,
  setExtra,
  isSentryInitialized,
}