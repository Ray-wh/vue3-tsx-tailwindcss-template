import type { RouteRecordRaw } from 'vue-router'

interface PageMeta {
  title?: string
  layout?: string
  requiresAuth?: boolean
  [key: string]: any
}

interface DefinePageMeta {
  (meta: PageMeta): void
}

declare global {
  const definePageMeta: DefinePageMeta
}

export {}
