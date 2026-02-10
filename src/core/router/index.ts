import { createRouter, createWebHistory } from 'vue-router';
import generatedRoutes from '~pages';
import { setupLayouts } from 'virtual:generated-layouts';

const routes = setupLayouts(generatedRoutes);

// 添加404页面路由
const notFoundRoute = {
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/not-found'),
  meta: {
    title: '404 页面不存在',
    layout: 'default'
  }
};

// 添加用户管理路由
const usersRoute = {
  path: '/users',
  component: () => import('@/views/users'),
  meta: {
    title: '用户管理',
    layout: 'default'
  }
};

// 将404路由和用户管理路由添加到所有路由的末尾
routes.push(notFoundRoute, usersRoute);

console.log('Original routes:', generatedRoutes);
console.log('Routes with layouts:', routes);
console.log('Added 404 route:', notFoundRoute);
console.log('Added users route:', usersRoute);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
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
