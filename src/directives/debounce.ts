/**
 * 防抖指令
 * 使用方式：v-debounce="{ fn: handleSubmit, delay: 1000 }"
 */
import type { Directive } from 'vue'

const debounce: Directive = {
  mounted(el, binding) {
    const { fn, delay = 500 } = binding.value
    let timer: number | null = null
    el._debounce = (e: Event) => {
      if (timer) clearTimeout(timer)
      timer = window.setTimeout(() => fn(e), delay)
    }
    el.addEventListener('input', el._debounce)
  },
  unmounted(el) {
    el.removeEventListener('input', el._debounce)
    delete el._debounce
  }
}

export default debounce