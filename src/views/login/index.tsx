/**
 * route
 * meta:
 *   layout: public
 *   title: 登录
 */
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authApi } from '@/api/auth';
import { useUserStore, type UserInfo } from '@/core/stores/modules/user';

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
        const response = await authApi.login({
          username: form.value.username,
          password: form.value.password,
        });
        const userStore = useUserStore();
        userStore.login(
          {
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
            role: response.user.isAdmin ? 'admin' : 'user',
            isAdmin: response.user.isAdmin,
            isActive: true,
          } as UserInfo,
          response.token
        );
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
