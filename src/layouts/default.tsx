// src/layouts/default.tsx（核心：添加 RouterView 作为内容出口）
import { defineComponent } from 'vue';
// 必须导入 RouterView 组件
import { RouterView } from 'vue-router';

const DefaultLayout = defineComponent({
  setup() {
    return () => (
      <div class="default-layout">
        {/* 布局的公共部分：比如导航栏、页脚 */}
        <header class="layout-header">这是默认布局的导航栏</header>

        {/* 核心：预留页面内容出口 —— 页面组件会渲染到这里 */}
        <main class="layout-content">
          <RouterView />
        </main>

        <footer class="layout-footer">这是默认布局的页脚</footer>
      </div>
    );
  },
});

export default DefaultLayout;
