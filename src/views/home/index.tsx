/**
 * route
 * meta:
 *   layout: default
 *   title: 欢迎来到首页
 */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'home',
  setup() {
    return () => (
      <div class="p-6">
        <a-card>
          <a-typography-title heading={2}>欢迎来到首页</a-typography-title>
          <a-typography-paragraph>
            这是一个使用 Vue3 + Vite + TSX + Arco Design Vue 构建的项目
          </a-typography-paragraph>
          <div class="flex gap-4 mt-6">
            <a-button type="primary">查看用户</a-button>
            <a-button type="outline">系统设置</a-button>
          </div>
        </a-card>
      </div>
    );
  },
});
