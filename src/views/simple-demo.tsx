/**
 * route
 * meta:
 *   layout: public
 *   title: 简化写法 Demo
 */
import { defineComponent, ref } from 'vue'

export default defineComponent(() => {
  const count = ref(0)
  const message = ref('Hello, Vue3!')

  const increment = () => {
    count.value++
  }

  const reset = () => {
    count.value = 0
  }

  return () => (
    <div class="min-h-screen flex flex-col items-center justify-center p-6">
      <a-card class="w-[60vw] !rounded-2xl p-8">
        <a-typography-title class="text-center mb-8">
          简化写法 Demo
        </a-typography-title>

        <div class="space-y-6">
          <div class="space-y-2">
            <a-typography-text>消息：{message.value}</a-typography-text>
            <a-typography-text>计数：{count.value}</a-typography-text>
          </div>

          <div class="space-x-2">
            <a-button type="primary" onClick={increment}>+1</a-button>
            <a-button type="default" onClick={reset}>重置</a-button>
          </div>
        </div>

        <div class="mt-8 text-sm text-gray-500">
          <p>使用了简化的 defineComponent 写法</p>
          <p>不需要手动写 name 属性</p>
          <p>不需要手动写 setup 属性</p>
          <p>直接传递函数给 defineComponent</p>
        </div>
      </a-card>
    </div>
  )
})