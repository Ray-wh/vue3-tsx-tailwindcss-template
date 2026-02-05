// src/layouts/admin.tsx
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

const AdminLayout = defineComponent({
  setup() {
    return () => (
      <div class="admin-layout">
        {/* 管理员布局（无导航、无页脚），仅预留内容出口 */}
        <main class="admin-content">
          <RouterView />
        </main>
      </div>
    )
  }
})

export default AdminLayout
