import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/assets/style/style.css'
import App from '@/App'
import router from '@/router'
import { initSentry } from '@/utils/sentry'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 初始化Sentry
initSentry(app, router)

app.use(pinia)
app.use(router)

app.mount('#app')
