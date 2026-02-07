import { createApp, defineComponent, onErrorCaptured } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { RouterView } from 'vue-router';
import '@/assets/style/tailwind.css';
import router from '@/core/router';
import { initSentry } from '@/core/utils/sentry';
import { registerGlobalDirectives } from '@/directives';

// 定义 App 组件
const App = defineComponent({
  name: 'App',
  setup() {
    onErrorCaptured((error) => {
      console.error('应用错误:', error);
      return false;
    });

    return () => (
      <div class="min-h-screen">
        <RouterView />
      </div>
    );
  },
});

// 初始化应用
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
