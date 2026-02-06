/**
 * route
 * meta:
 *   layout: public
 *   title: defineProps 和 defineEmit Demo
 */
import { defineComponent, ref } from 'vue';

// 子组件
const ChildComponent = defineComponent({
  name: 'ChildComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:count', 'reset'],
  setup(props, { emit, expose }) {
    const increment = () => {
      emit('update:count', props.count + 1);
    };

    const reset = () => {
      emit('reset');
    };

    // 暴露内部方法
    expose({
      increment,
      reset,
    });

    return () => (
      <div class="space-y-4">
        <a-typography-text>子组件</a-typography-text>
        <a-card class="p-4">
          <p>标题：{props.title}</p>
          <p>计数：{props.count}</p>
          <div class="space-x-2 mt-4">
            <a-button type="primary" onClick={increment}>
              +1
            </a-button>
            <a-button type="default" onClick={reset}>
              重置
            </a-button>
          </div>
        </a-card>
      </div>
    );
  },
});

// 父组件
export default defineComponent({
  name: 'define-demo',
  setup() {
    const count = ref(0);
    const title = ref('父组件传递的标题');
    const childRef = ref<{ increment: () => void; reset: () => void } | null>(
      null
    );

    const handleCountUpdate = (value: number) => {
      count.value = value;
    };

    const handleReset = () => {
      count.value = 0;
    };

    const callChildMethod = () => {
      if (childRef.value) {
        childRef.value.increment();
      }
    };

    return () => (
      <div class="min-h-screen flex flex-col items-center justify-center p-6">
        <a-card class="w-[60vw] !rounded-2xl p-8">
          <a-typography-title class="text-center mb-8">
            defineProps 和 defineEmit Demo
          </a-typography-title>

          <div class="space-y-6">
            <div class="space-y-2">
              <a-typography-text>父组件</a-typography-text>
              <a-card class="p-4">
                <p>计数：{count.value}</p>
                <a-button type="default" onClick={callChildMethod} class="mt-4">
                  调用子组件方法
                </a-button>
              </a-card>
            </div>

            <ChildComponent
              ref={childRef}
              title={title.value}
              count={count.value}
              onUpdate:count={handleCountUpdate}
              onReset={handleReset}
            />
          </div>

          <div class="mt-8 text-sm text-gray-500">
            <p>使用了 Vue3 组件的标准写法</p>
          </div>
        </a-card>
      </div>
    );
  },
});
