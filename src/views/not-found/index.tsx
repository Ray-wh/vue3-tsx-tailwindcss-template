/**
 * route
 * meta:
 *   layout: default
 *   title: 404 页面不存在
 */
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'not-found',
  setup() {
    const router = useRouter();

    const goHome = () => {
      router.push('/');
    };

    return () => (
      <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <a-card style={{ width: 400, textAlign: 'center' }}>
          <a-typography-title
            heading={2}
            style={{ color: '#ff4d4f', fontSize: 72, marginBottom: 16 }}
          >
            404
          </a-typography-title>
          <a-typography-paragraph style={{ margin: '16px 0 24px' }}>
            抱歉，您访问的页面不存在
          </a-typography-paragraph>
          <a-button type="primary" onClick={goHome}>
            返回首页
          </a-button>
        </a-card>
      </div>
    );
  },
});
