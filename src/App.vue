<script setup lang="ts">
import { onBeforeMount, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth'
import { router } from './routes'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import { useThemeStore } from './stores/theme'
import AppLayout from './components/layouts/AppLayout.vue'

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);
const themeStore = useThemeStore();
const { mode } = storeToRefs(themeStore);

onBeforeMount(async() => {
  if(!isLoggedIn.value){
    router.push('login');
  }
  themeLogic(mode.value)
});

const themeLogic = (mode:string) => {
  if(mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)){
    document.documentElement.classList.add('dark')
  }else{
    document.documentElement.classList.remove('dark')
  }
}

watch(mode, async (newMode) => {
  themeLogic(newMode);
})

</script>

<template>
  <AppLayout>
    <ThemeSwitcher />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppLayout>
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
