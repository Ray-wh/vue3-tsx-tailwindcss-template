/**
 * 节流指令
 * 使用方式：v-throttle="{ fn: handleScroll, delay: 1000 }"
 */
import type { Directive } from 'vue';

const throttle: Directive = {
  mounted(el, binding) {
    const { fn, delay = 500 } = binding.value;
    let lastTime = 0;
    el._throttle = (e: Event) => {
      const now = Date.now();
      if (now - lastTime > delay) {
        fn(e);
        lastTime = now;
      }
    };
    el.addEventListener('scroll', el._throttle);
  },
  unmounted(el) {
    el.removeEventListener('scroll', el._throttle);
    delete el._throttle;
  },
};

export default throttle;
