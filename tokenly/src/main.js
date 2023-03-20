import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from "vue-i18n"

import App from './App.vue'
import router from './router'
import messages from "@intlify/unplugin-vue-i18n/messages"

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en",
    fallbackLocale: "en",
    availableLocales: ["en", "no"],
    messages: messages,
  })

import './assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
