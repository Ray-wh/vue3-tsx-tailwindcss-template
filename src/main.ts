import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import '@/assets/style/tailwind.css';
import App from '@/App';
import router from '@/router';
import { initSentry } from '@/utils/sentry';
import { registerGlobalDirectives } from '@/directives';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

// 初始化Sentry
initSentry(app, router);

// 注册全局自定义指令
registerGlobalDirectives(app);

app.mount('#app');
