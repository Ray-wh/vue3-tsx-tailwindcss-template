import * as Sentry from '@sentry/vue'
import type { App } from 'vue'

// 初始化Sentry
export function initSentry(app: App, router: any) {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (dsn) {
    Sentry.init({
      app,
      dsn,
      sendDefaultPii: true,
      integrations: [
        Sentry.browserTracingIntegration({ router }),
        Sentry.replayIntegration()
      ],
      tracesSampleRate: 1.0,
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      enableLogs: true
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

export default {
  init: initSentry,
  captureError,
  captureMessage,
}