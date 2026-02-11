import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLoading',
  props: {
    text: {
      type: String,
      default: '加载中...',
    },
    size: {
      type: String as () => 'small' | 'medium' | 'large',
      default: 'medium',
    },
  },
  setup(props) {
    const sizeMap = {
      small: 24,
      medium: 32,
      large: 48,
    };

    return () => (
      <div class="flex flex-col items-center justify-center gap-4">
        <a-spin size={props.size} />
        <span class="text-gray-500">{props.text}</span>
      </div>
    );
  },
});
