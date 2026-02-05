/**
 * route
 * meta:
 *   layout: public
 *   title: Sentry 测试
 */
import { defineComponent } from 'vue';
import { captureError, captureMessage } from '@/utils/sentry';

export default defineComponent({
  name: 'sentry-test',
  setup() {
    // 测试错误捕获
    const testSentry = () => {
      try {
        throw new Error('Sentry 配置测试错误');
      } catch (error) {
        captureError(error, {
          test: 'sentry-config-test',
          timestamp: new Date().toISOString()
        });
        alert('错误已发送到 Sentry，请登录 Sentry 后台查看');
      }
    };

    // 测试消息捕获
    const testMessage = () => {
      captureMessage('Sentry 配置测试消息', 'info');
      alert('消息已发送到 Sentry，请登录 Sentry 后台查看');
    };

    return () => (
      <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <a-card class="w-[50vw] !rounded-2xl p-8">
          <a-typography-title class="text-center mb-6">
            Sentry 配置测试
          </a-typography-title>
          <p class="text-center mb-6 text-gray-600">
            点击下方按钮测试 Sentry 配置是否成功
          </p>
          <div class="space-y-4">
            <a-button class="mr-2" type="primary" onClick={testSentry} block size="large">
              发送测试错误到 Sentry
            </a-button>
            <a-button type="primary" onClick={testMessage} block size="large">
              发送测试消息到 Sentry
            </a-button>
          </div>
          <div class="mt-6 text-sm text-gray-500">
            <p>测试步骤：</p>
            <p>1. 点击上方按钮</p>
            <p>2. 登录 Sentry 后台 (https://sentry.io)</p>
            <p>3. 查看 Issues 标签是否有新错误</p>
          </div>
        </a-card>
      </div>
    );
  },
});
