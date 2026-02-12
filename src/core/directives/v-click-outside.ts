/**
 * 点击外部关闭弹窗指令
 * 使用方式：v-click-outside="handleClose"
 */
import type { Directive } from 'vue';

const clickOutside: Directive = {
  mounted(el, binding) {
    const handleClick = (e: MouseEvent) => {
      if (el && !el.contains(e.target as Node)) {
        binding.value();
      }
    };
    el._clickOutside = handleClick;
    document.addEventListener('click', handleClick);
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside);
    delete el._clickOutside;
  },
};

export default clickOutside;