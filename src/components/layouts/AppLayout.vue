<script setup lang="ts">
// App layout wrapper component
</script>

<template>
    <div class="w-full h-full flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-zinc-800 transition-colors duration-200">
        <div class="w-full max-w-4xl px-4 py-8">
            <slot></slot>
        </div>
    </div>
</template>