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
    <div class="w-full max-w-md bg-white dark:bg-zinc-700 rounded-xl shadow-lg overflow-hidden">
      <!-- Header with greeting and logout -->
      <div class="px-6 py-4 bg-indigo-500 dark:bg-indigo-600 text-white flex justify-between items-center">
        <h1 v-if="user?.name" class="text-xl font-semibold">
          Welcome, <span id="name">{{ user.name }}</span>
        </h1>
        <button @click="logout" class="text-sm px-3 py-1 bg-indigo-400 hover:bg-indigo-300 rounded-md transition-colors duration-200">
          Logout
        </button>
      </div>

      <!-- Chat Box -->
      <div class="px-6 pt-4">
        <div 
          class="flex flex-col justify-end w-full h-72 border dark:border-zinc-500 rounded-lg overflow-y-auto mb-4 p-4 bg-zinc-50 dark:bg-zinc-800 text-left" 
          id="chat-box"
        >
          <p 
            v-for="message in messages" 
            :key="message.id" 
            class="py-2 px-3 mb-2 bg-indigo-100 dark:bg-zinc-700 rounded-lg text-zinc-500 dark:text-zinc-400"
          >
            {{ message.text }}
          </p>
        </div>
      </div>

      <!-- Message Input -->
      <div class="px-6 pb-6">
        <div class="flex border border-zinc-200 dark:border-zinc-600 rounded-lg overflow-hidden">
          <input 
            @keyup.enter="submit" 
            type="text" 
            v-model="messageText" 
            id="message-input" 
            class="shadow-inner flex-grow p-3 border-none focus:outline-none dark:bg-zinc-600 placeholder:text-zinc-400 dark:placeholder:text-zinc-400" 
            placeholder="Type your message..."
          >
          <button 
            @click.stop="submit" 
            id="send-button" 
            class="px-4 bg-indigo-500 text-white hover:bg-indigo-700 transition-colors duration-200 flex items-center"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>