import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import '@/assets/style/tailwind.css';
import { registerGlobalRouter } from '@core/router';
import { registerGlobalPinia } from '@core/stores';
import { registerGlobalSentry } from '@core/utils/sentry';
import { registerGlobalDirectives } from '@core/directives';
import { registerGlobalComponents } from '@core/components';

const app = createApp({ render: () => <RouterView /> });

app.config.errorHandler = (err, ins, info) => {
  const errorMsg = err instanceof Error ? err.message : String(err);
  console.error(
    `[全局错误] 组件: ${ins?.$options.name || '根组件'} | 位置: ${info} | 信息: ${errorMsg}`
  );
};

[
  registerGlobalPinia,
  registerGlobalRouter,
  registerGlobalSentry,
  registerGlobalDirectives,
  registerGlobalComponents,
].forEach((register) => register(app));

app.mount('#app');
