import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import '@/assets/style/tailwind.css';
import { registerGlobalRouter } from '@/core/router';
import { registerGlobalPinia } from '@/core/stores';
import { registerGlobalSentry } from '@/core/sentry';
import { registerGlobalDirectives } from '@/core/directives';
import { registerGlobalComponents } from '@/core/components';

// 创建 Vue 应用实例
const app = createApp({ render: () => <RouterView /> });
// 全局错误处理
app.config.errorHandler = (err, ins, info) => {
  const errorMsg = err instanceof Error ? err.message : String(err);
  console.error(
    `[全局错误] 组件: ${ins?.$options.name || '根组件'} | 位置: ${info} | 信息: ${errorMsg}`
  );
};
// 注册全局插件
[
  registerGlobalPinia,
  registerGlobalRouter,
  registerGlobalSentry,
  registerGlobalDirectives,
  registerGlobalComponents,
].forEach((register) => register(app));
// 挂载 Vue 应用实例
app.mount('#app');
