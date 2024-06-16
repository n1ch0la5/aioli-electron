import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { api } from '../utils/api'
import { router } from '../routes'

export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
  }
export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const isLoggedIn = ref(false);
    const token = ref(null);
    // const doubleCount = computed(() => count.value * 2)
    const login = async (email:string, password:string) => {
        const response = await api.auth.login(email, password)
        token.value = response;
        // localStorage.setItem('authToken', token)
        await getUser()

        if(user.value?.id){
            isLoggedIn.value = true
        }
    }

    const getUser = async () => {
        const response = await api.auth.getUser();
        user.value = response.data;
    }

    const logout = async () => {
        const response = await api.auth.logout()
        .catch(error => {
            console.log('error - ', error);
                if(error.response.status === 401 || error.response.status === 419){
                    clearAuth()
                }
          });

        if(response.message === 'Logged out'){
            clearAuth()
        }
    }

    const clearAuth = async () => {
        localStorage.removeItem("authToken")
        user.value = null
        isLoggedIn.value = false
    }

    watch(isLoggedIn, (newLoggedIn) => {
        if(newLoggedIn === false){
            router.push('login')
        }else{
            router.push('/')
        }
      })

    return { user, isLoggedIn, login, logout, getUser, clearAuth, token }
  },
  {
    persist: true,
  })