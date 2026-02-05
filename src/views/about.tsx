/**
 * route
 * meta:
 *   layout: admin
 *   title: 关于我们
 */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'about',
  setup() {
    const projectInfo = {
      name: 'Vue3 + NestJS 全栈项目',
      frontend: 'Vue3 + Vite + TSX + Arco Design Vue',
      backend: 'NestJS + TypeScript + TypeORM',
      features: '路由守卫、动态路由、JWT鉴权、RBAC权限控制',
      tools: 'ESLint、Prettier、Stylelint、Husky',
    };

    return () => (
      <div class="p-6">
        <a-card>
          <a-typography-title heading={2}>关于项目</a-typography-title>
          <a-descriptions column={1} labelStyle={{ fontWeight: 'bold' }}>
            <a-descriptions-item label="项目名称">
              {projectInfo.name}
            </a-descriptions-item>
            <a-descriptions-item label="前端技术栈">
              {projectInfo.frontend}
            </a-descriptions-item>
            <a-descriptions-item label="后端技术栈">
              {projectInfo.backend}
            </a-descriptions-item>
            <a-descriptions-item label="核心功能">
              {projectInfo.features}
            </a-descriptions-item>
            <a-descriptions-item label="开发工具">
              {projectInfo.tools}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </div>
    );
  },
});
