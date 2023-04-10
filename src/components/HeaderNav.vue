<script setup>
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore()
const { user, isLoggedIn } = storeToRefs(authStore)
const { requestAccessToken, logout } = authStore

</script>
<template>
    <div>
        <div v-if="isLoggedIn" class="flex-col">
        <p class="mb-2">Logged in!</p> 
        <div class="mb-2"><code class="text-sm">{{ user }}</code></div>
        <button @click="logout">Logout</button>
        </div>
        <button 
            @click="requestAccessToken"
            class="text-gray-400 hover:text-gray-100"
            v-else>
            Login</button>
    </div>
</template>