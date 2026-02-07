/**
 * route
 * meta:
 *   layout: public
 *   title: 登录
 */
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/core/api';
import { useUserStore } from '@/core/stores/user';

export default defineComponent({
  name: 'login',
  setup() {
    const router = useRouter();
    const form = ref({
      username: '',
      password: '',
    });

    const handleLogin = async () => {
      try {
        const response = await api.login({
          username: form.value.username,
          password: form.value.password,
        });
        const userStore = useUserStore();
        userStore.login(response.user, response.token);
        router.push('/');
      } catch (error) {
        console.error('登录失败:', error);
      }
    };

    return () => (
      <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <a-card class="w-[40vw] !rounded-2xl p-6">
          <a-typography-title class="text-center">登录</a-typography-title>
          <a-form model={form.value}>
            <a-form-item
              label="用户名"
              field="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <a-input
                placeholder="请输入用户名"
                value={form.value.username}
                onChange={(value: string) => (form.value.username = value)}
              />
            </a-form-item>
            <a-form-item
              label="密码"
              field="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <a-input-password
                placeholder="请输入密码"
                value={form.value.password}
                onChange={(value: string) => (form.value.password = value)}
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" long onClick={handleLogin}>
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </div>
    );
  },
});
