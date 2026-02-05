import { defineComponent, onErrorCaptured } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    onErrorCaptured((error) => {
      console.error('应用错误:', error);
      return false;
    });

    return () => (
      <div class="min-h-screen">
        <RouterView />
      </div>
    );
  },
});
