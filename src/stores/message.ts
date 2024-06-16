import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { api } from '../utils/api'

export interface Message {
    id: number
    user_id: number
    text: string
    time: string
  }
export const useMessageStore = defineStore('message', () => {
    const messages = ref<Message[]>([]);

    const addMessage = async (message: Message) => {
        messages.value.push(message);
    }

    const sendMessage = async (message:string) => {
        api.message.send(message);
    }

    const clearMessages = async (message:string) => {
        messages.value = [];
    }

    const getMessages = async () => {
        messages.value = await api.message.get();
    }

    return { messages, addMessage, sendMessage, clearMessages, getMessages }
  },
  {
    persist: true,
  })