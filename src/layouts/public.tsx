// src/layouts/public.tsx
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

const PublicLayout = defineComponent({
  setup() {
    return () => (
      <div class="public-layout">
        {/* 公共布局（无导航、无页脚），仅预留内容出口 */}
        <main class="public-content">
          <RouterView />
        </main>
      </div>
    );
  },
});

export default PublicLayout;
