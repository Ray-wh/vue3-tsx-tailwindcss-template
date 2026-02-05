/**
 * route
 * meta:
 *   layout: public
 *   title: Hook Demo
 */
import { defineComponent } from 'vue'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useFetch } from '@/hooks/useFetch'

export default defineComponent({
  name: 'hook-demo',
  setup() {
    const { x, y } = useMousePosition()
    const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/todos/1')

    return () => (
      <div class="min-h-screen flex flex-col items-center justify-center p-6">
        <a-card class="w-[60vw] !rounded-2xl p-8">
          <a-typography-title class="text-center mb-8">
            Hook Demo
          </a-typography-title>

          <div class="space-y-6">
            <div class="space-y-2">
              <a-typography-text>鼠标位置：</a-typography-text>
              <a-card class="p-4">
                <p>X: {x.value}, Y: {y.value}</p>
              </a-card>
            </div>

            <div class="space-y-2">
              <a-typography-text>Fetch 数据：</a-typography-text>
              {loading.value ? (
                <a-spin />
              ) : error.value ? (
                <a-alert type="error" message="加载失败" description={error.value.message} />
              ) : (
                <a-card class="p-4">
                  <pre>{JSON.stringify(data.value, null, 2)}</pre>
                  <a-button type="primary" onClick={refetch} class="mt-4">
                    重新加载
                  </a-button>
                </a-card>
              )}
            </div>
          </div>

          <div class="mt-8 text-sm text-gray-500">
            <p>使用了 useMousePosition 和 useFetch 自定义 Hook</p>
          </div>
        </a-card>
      </div>
    )
  }
})