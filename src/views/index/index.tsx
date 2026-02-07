/**
 * route
 * meta:
 *   layout: default
 *   title: 首页
 */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'index',
  setup() {
    return () => (
      <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-3xl font-bold text-center text-gray-900">首页</h1>
          <p class="mt-4 text-center text-gray-600">
            这是通过 index.tsx 文件定义的根路径页面
          </p>
        </div>
      </div>
    );
  },
});
