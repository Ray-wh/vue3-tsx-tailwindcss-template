import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppEmpty',
  props: {
    description: {
      type: String,
      default: '暂无数据',
    },
    image: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    return () => (
      <div class="flex flex-col items-center justify-center py-12">
        <a-empty
          description={props.description}
          image={props.image}
        />
      </div>
    );
  },
});
