<script setup lang="ts">
    import { ref } from 'vue'
    import { ComputerDesktopIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
    import { useThemeStore } from '../stores/theme'
    import { storeToRefs } from 'pinia';

    const themeStore = useThemeStore();
    const { mode } = storeToRefs(themeStore)
    const openMenu = ref(false);

    const toggleTheme = async (mode: string) => {
        themeStore.selectMode(mode);
        openMenu.value = false;
    }
</script>
<template>
    <div class="absolute top-5 right-12 z-50 text-zinc-600 dark:text-zinc-200">
        <div @click="openMenu = !openMenu" v-if="!openMenu" class="cursor-pointer">
            <component
            :is="mode === 'light' ? SunIcon : (mode === 'dark' ? MoonIcon : ComputerDesktopIcon)"
            class="size-5"
        />
        </div>
        <div v-else class="flex flex-col bg-white dark:bg-black border border-zinc-100 dark:border-zinc-600 shadow-md rounded-lg space-y-3 py-4 px-5 text-sm font-mono ">
            <span @click="toggleTheme('light')" class="flex items-center space-x-2 cursor-pointer ">
                <SunIcon class="size-5" /> <span>Light</span>
            </span>
            <span @click="toggleTheme('dark')" class="flex items-center space-x-2 cursor-pointer">
                <MoonIcon class="size-5" /> <span>Dark</span>
            </span>
            <span @click="toggleTheme('system')" class="flex items-center space-x-2 cursor-pointer ">
                <ComputerDesktopIcon class="size-5" /> <span>System</span>
            </span>
        </div>
    </div>
</template>
