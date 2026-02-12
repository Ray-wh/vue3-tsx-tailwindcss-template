import type { Directive } from 'vue';
import { nextTick } from 'vue';

const focus: Directive = {
  mounted(el) {
    nextTick(() => {
      const input = el.querySelector('input') || el;
      input.focus();
    });
  },
};

export default focus;