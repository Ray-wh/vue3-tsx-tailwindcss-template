/**
 * route
 * meta:
 *   layout: public
 *   title: 自定义指令 Demo
 */
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'directive-demo',
  setup() {
    const inputValue = ref('');

    return () => (
      <div class="min-h-screen flex flex-col items-center justify-center p-6">
        <a-card class="w-[60vw] !rounded-2xl p-8">
          <a-typography-title class="text-center mb-8">
            自定义指令 Demo
          </a-typography-title>

          <div class="space-y-6">
            <div class="space-y-2">
              <a-typography-text>自动聚焦输入框：</a-typography-text>
              <a-input
                v-focus
                placeholder="自动聚焦"
                value={inputValue.value}
                onChange={(value: string) => (inputValue.value = value)}
              />
            </div>
          </div>

          <div class="mt-8 text-sm text-gray-500">
            <p>使用了 v-focus 自定义指令，页面加载时自动聚焦输入框</p>
          </div>
        </a-card>
      </div>
    );
  },
});
