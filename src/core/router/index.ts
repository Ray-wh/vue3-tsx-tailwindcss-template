import { createRouter, createWebHistory } from 'vue-router';
import generatedRoutes from '~pages';
import { setupLayouts } from 'virtual:generated-layouts';
import type { App } from 'vue';

// 初始化路由（合并布局 + 自定义路由）
const routes = setupLayouts(generatedRoutes).concat([
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/not-found'),
    meta: { title: '404 页面不存在', layout: 'default' },
  }
]);

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫：标题设置 + 权限校验
router.beforeEach((to, _, next) => {
  document.title = (to.meta.title as string) || 'Vue3 App';
  to.meta.requiresAuth && !localStorage.getItem('token')
    ? next({ name: 'login' })
    : next();
});

// 动态添加路由（去重）
export const addDynamicRoutes = (routes: any[]) => {
  routes.forEach(
    (route) => !router.hasRoute(route.name) && router.addRoute(route)
  );
};

// 路由初始化（挂载到Vue实例）
export const registerGlobalRouter = (app: App) => app.use(router);

export default router;
