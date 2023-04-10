import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "./style.css"
import App from './App.vue'
import './samples/node-api'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

let myApp = createApp(App)
  .use(pinia)

  myApp.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
