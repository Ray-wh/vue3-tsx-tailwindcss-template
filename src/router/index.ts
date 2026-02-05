import { createRouter, createWebHistory } from 'vue-router';
import generatedRoutes from '~pages';
import { setupLayouts } from 'virtual:generated-layouts';

const routes = setupLayouts(generatedRoutes);

console.log('Original routes:', generatedRoutes);
console.log('Routes with layouts:', routes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守
router.beforeEach((to, from, next) => {
  console.log('to:', to);
  console.log('from:', from);
  console.log('next:', next);

  // 设置页面标题
  document.title = (to.meta.title as string) || 'Vue3 App';

  // 检查是否需要认证
  const requiresAuth = to.meta.requiresAuth;
  const token = localStorage.getItem('token');

  if (requiresAuth && !token) {
    // 未登录，跳转到登录页
    next({ name: 'login' });
  } else {
    next();
  }
});

// 动态路由添加方法
export function addDynamicRoutes(routes: any[]) {
  routes.forEach((route) => {
    const existingRoute = router.hasRoute(route.name);
    if (!existingRoute) {
      router.addRoute(route);
    }
  });
}

export default router;
