import * as Sentry from '@sentry/browser'

// 初始化Sentry
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (dsn) {
    Sentry.init({
      dsn,
      tracesSampleRate: 1.0,
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