<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore();
const { login } = authStore;

const email = ref(import.meta.env.VITE_LARAVEL_EMAIL);
const password = ref(import.meta.env.VITE_LARAVEL_PASS)

</script>
<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
    <div class="w-full h-full bg-zinc-200 dark:bg-zinc-900 rounded-2xl">
    <div class="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-full max-w-sm space-y-10">
        <div>
          <h1 class="mx-auto text-center text-3xl font-bold text-indigo-600 dark:text-indigo-400">Company Name</h1>
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900 dark:text-zinc-100">Sign in to your account</h2>
        </div>
        <form class="space-y-6" action="#" method="POST">
          <div class="relative -space-y-px rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-zinc-300 dark:ring-zinc-600" />
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required class="relative block w-full rounded-t-md border-0 py-1.5 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 ring-1 ring-inset ring-zinc-100 dark:ring-zinc-700 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Email address" />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full rounded-b-md border-0 py-1.5 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 ring-1 ring-inset ring-zinc-100 dark:ring-zinc-700 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Password" />
            </div>
          </div>
  
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-indigo-600 focus:ring-indigo-600 dark:focus:ring-indigo-500" />
              <label for="remember-me" class="ml-3 block text-sm leading-6 text-zinc-900 dark:text-zinc-300">Remember me</label>
            </div>
  
            <div class="text-sm leading-6">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Forgot password?</a>
            </div>
          </div>
  
          <div>
            <button @click.stop.prevent="login(email, password)" type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:focus-visible:outline-indigo-500">Sign in</button>
          </div>
        </form>
  
        <p class="text-center text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          Not a member?
          {{ ' ' }}
          <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Start a 14-day free trial</a>
        </p>
      </div>
    </div>
</div>
</template>