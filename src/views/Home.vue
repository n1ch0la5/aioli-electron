<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useMessageStore } from '../stores/message';
import { storeToRefs } from 'pinia';

const messageText = ref("");
const incomingMessage = ref("test");
const messageTime = ref("");

const authStore = useAuthStore();
const { isLoggedIn, user } = storeToRefs(authStore);
const { logout } = authStore;

const messageStore = useMessageStore();
const { messages } = storeToRefs(messageStore);
const { addMessage, sendMessage, clearMessages, getMessages } = messageStore;

const submit = async () => {
    await sendMessage(messageText.value);
    messageText.value = ""
}

onBeforeMount(() => {
  getMessages();
  
})

const setupWebSocket = () => {
    const channel = window.Echo.channel('channel_for_everyone');
    channel.listen('GotMessage', (e:any) => {
       console.log(e.message);
        addMessage(e.message);
    });
  }

  onMounted(() => {
    console.log(messages.value)
    setupWebSocket()  
  })
</script>
<template>
    <div lass="flex flex-col items-center justify-center min-h-screen bg-gray-100">
       
    <!-- Container -->
  <div class="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
    <!-- Greeting -->
    <h1 v-if="user?.name" class="text-2xl font-semibold mb-4">Hi, <span id="name">{{ user.name }}</span></h1>

    <!-- Chat Box -->
    <div class="flex flex-col justify-end h-64 border rounded-md overflow-y-auto mb-4 p-2 bg-gray-50 text-left" id="chat-box">
      <!-- Messages will be appended here -->
      <p v-for="message in messages" :key="message.id">{{ message.text }}</p>
    </div>

    <!-- Message Input -->
    <div class="flex mb-4">
      <input type="text" v-model="messageText" id="message-input" class="flex-grow p-2 border rounded-l-md focus:outline-none" placeholder="Type your message">
      <button @click.stop="submit" @keyup="submit" id="send-button" class="p-2 bg-blue-500 text-white rounded-r-md rounded-l-none hover:bg-blue-700">Send</button>
    </div>

    <!-- Logout Button -->
    <button @click="logout" id="logout-button" class="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-700">Logout</button>
  </div>
    </div>
</template>