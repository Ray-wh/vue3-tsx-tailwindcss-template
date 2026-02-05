import type { Directive } from 'vue';
import { nextTick } from 'vue';

const focus: Directive = {
  mounted(el) {
    // 等待 DOM 渲染完成
    nextTick(() => {
      // 检查是否是 Arco Design 的输入框
      const input = el.querySelector('input') || el;
      input.focus();
    });
  },
};

export default focus;
