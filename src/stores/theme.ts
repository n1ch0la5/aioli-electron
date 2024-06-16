import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const mode = ref("light");

    const selectMode = async (newMode:string) => {
        mode.value = newMode;
    }

    return { mode, selectMode }
  },
  {
    persist: true,
  })