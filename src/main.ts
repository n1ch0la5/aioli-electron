import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { router } from './routes'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { api } from './utils/api'
import './style.css'
import './demos/ipc'

declare global {
  interface Window {
      Pusher:any;
      Echo:any;
  }
}
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'
window.Pusher = Pusher;
 
window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    cluster: 'Redis',
    authorizer: (channel:any, options:any) => {
      return {
          authorize: async(socketId:any, callback:any) => {
            await api.auth.broadcasting(channel, socketId, callback);
          }
      };
  },
});

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
.$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})

