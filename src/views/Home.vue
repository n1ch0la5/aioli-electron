<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useMessageStore } from '../stores/message';
import { storeToRefs } from 'pinia';

const messageText = ref("");

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { logout } = authStore;

const messageStore = useMessageStore();
const { messages } = storeToRefs(messageStore);
const { addMessage, sendMessage, getMessages } = messageStore;

const submit = async () => {
    await sendMessage(messageText.value);
    messageText.value = ""
}

onBeforeMount(() => {
  getMessages();
})

  onMounted(() => {
    console.log(messages.value)
    setupWebSocket()  
  })

  const setupWebSocket = () => {
    const channel = window.Echo.channel('channel_for_everyone');
    channel.listen('GotMessage', (e:any) => {
       console.log(e.message);
        addMessage(e.message);
    });
  }
</script>
<template>
    <div class="flex flex-col items-center justify-center min-h-screen dark:text-zinc-300">
       
    <!-- Container -->
  <div class="w-full max-w-md p-4 bg-white dark:bg-zinc-700 rounded-lg shadow-md">
    <!-- Greeting -->
    <h1 v-if="user?.name" class="text-2xl font-semibold mb-2">Hi, <span id="name">{{ user.name }}</span></h1>
    <p @click="logout" class="mb-4 text-sm cursor-pointer">logout</p>

    <!-- Chat Box -->
    <div class="flex flex-col justify-end w-full h-64 border dark:border-zinc-500 rounded-md overflow-y-auto mb-4 p-2 bg-zinc-50 dark:bg-zinc-800 text-left" id="chat-box">
      <!-- Messages will be appended here -->
      <p v-for="message in messages" :key="message.id">{{ message.text }}</p>
    </div>

    <!-- Message Input -->
    <div class="flex mb-4 border border-zinc-300 dark:border-zinc-800 rounded-md">
      <input type="text" v-model="messageText" id="message-input" class="shadow-inner flex-grow p-2 border-none rounded-l-md focus:outline-none dark:bg-zinc-600 placeholder:dark:text-white" placeholder="Type your message">
      <button @click.stop="submit" @keyup="submit" id="send-button" class="p-2 bg-indigo-500  text-white rounded-r-md rounded-l-none hover:bg-indigo-700">Send</button>
    </div>

    <!-- Logout Button -->
    <!-- <button @click="logout" id="logout-button" class="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-700">Logout</button> -->
  </div>
    </div>
</template>