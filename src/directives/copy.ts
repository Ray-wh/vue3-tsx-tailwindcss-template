/**
 * 复制指令
 * 使用方式：v-copy="textToCopy"
 */
import type { Directive } from 'vue'

const copy: Directive = {
  mounted(el, binding) {
    const handleClick = () => {
      navigator.clipboard.writeText(binding.value)
        .then(() => {
          console.log('复制成功')
        })
        .catch(err => {
          console.error('复制失败:', err)
        })
    }
    el._copy = handleClick
    el.addEventListener('click', handleClick)
  },
  unmounted(el) {
    el.removeEventListener('click', el._copy)
    delete el._copy
  }
}

export default copy