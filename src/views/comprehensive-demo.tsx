/**
 * route
 * meta:
 *   layout: public
 *   title: 综合特性 Demo
 */
import { defineComponent, ref } from 'vue'
import ChildComponent from './child-component'

export default defineComponent(() => {
  const count = ref(0)
  const title = ref('父组件传递的标题')

  const handleCountUpdate = (value: number) => {
    count.value = value
  }

  const handleReset = () => {
    count.value = 0
  }

  return () => (
    <div class="min-h-screen flex flex-col items-center justify-center p-6">
      <a-card class="w-[60vw] !rounded-2xl p-8">
        <a-typography-title class="text-center mb-8">
          综合特性 Demo
        </a-typography-title>

        <div class="space-y-6">
          <div class="space-y-2">
            <a-typography-text>父组件</a-typography-text>
            <a-card class="p-4">
              <p>计数：{count.value}</p>
            </a-card>
          </div>

          {/* 使用子组件 */}
          <ChildComponent
            title={title.value}
            count={count.value}
            onUpdate:count={handleCountUpdate}
            onReset={handleReset}
            // 额外属性（会被 attrs 接收）
            data-testid="child-component"
            custom-attr="custom-value"
          >
            {/* 插槽内容 */}
            <div class="p-4 bg-gray-100 rounded">
              <p>这是父组件传递的插槽内容</p>
              <p>可以包含任意内容</p>
            </div>
          </ChildComponent>
        </div>

        <div class="mt-8 text-sm text-gray-500">
          <p>综合展示了以下特性：</p>
          <p>1. Props：父组件向子组件传递数据</p>
          <p>2. Emit：子组件向父组件传递事件</p>
          <p>3. Slots：父组件向子组件传递内容</p>
          <p>4. Attrs：父组件向子组件传递额外属性</p>
        </div>
      </a-card>
    </div>
  )
})