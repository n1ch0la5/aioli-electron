import { createWebHistory, createRouter } from 'vue-router'

// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', component: Home, name: 'home' },
  // { path: '/cards', component: Cards, name: 'cards' },
  { path: '/login', component: Login, name: 'login' },
]

 export const router = createRouter({
  history: createWebHistory(),
  routes,
})