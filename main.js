import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useSettings } from './composables/useSettings.js'
import './assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

useSettings()

app.use(router)

app.mount('#app')