/**
 * 子组件
 */
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:count', 'reset'],
  setup(props, { emit, slots, attrs }) {
    const increment = () => {
      emit('update:count', props.count + 1)
    }

    const reset = () => {
      emit('reset')
    }

    return () => (
      <div class="space-y-4">
        <a-typography-text>子组件</a-typography-text>
        <a-card class="p-4">
          {/* 使用 props */}
          <p>标题：{props.title}</p>
          <p>计数：{props.count}</p>
          
          {/* 使用 slots */}
          <div class="mt-4">
            <a-typography-text>插槽内容：</a-typography-text>
            {slots.default ? slots.default() : <p>没有插槽内容</p>}
          </div>
          
          {/* 使用 attrs */}
          <div class="mt-4 text-sm text-gray-500">
            <p>额外属性：{JSON.stringify(attrs)}</p>
          </div>
          
          <div class="space-x-2 mt-4">
            <a-button type="primary" onClick={increment}>+1</a-button>
            <a-button type="default" onClick={reset}>重置</a-button>
          </div>
        </a-card>
      </div>
    )
  }
})