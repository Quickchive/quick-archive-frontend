import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '/Users/mac/Desktop/quick-archive-frontend/src/App.vue'
import router from './router'
import './assets/scss/_index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
