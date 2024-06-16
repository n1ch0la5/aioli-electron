<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { api } from './utils/api'
import { useAuthStore } from './stores/auth'
import { router } from './routes'

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
const { login, logout, user } = authStore;

onBeforeMount(async() => {
  if(!isLoggedIn.value){
    router.push('login');
  }
});


</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center text-center bg-neutral-200">
    <RouterView />
  </div>
</template>

<style>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9FEAF9);
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
