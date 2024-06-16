import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useAuthStore } from '../stores/auth';

// Create axios instance with base URL and default headers
const request = axios.create({
  baseURL: import.meta.env.VITE_LARAVEL_URI,
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Function to get token from localStorage
const getToken = async () => {
  // return localStorage.getItem('authToken') ?? null;
  const authStore = useAuthStore();
  return  authStore.token ?? null;
};

request.interceptors.request.use(async function (config) {
  const token = await getToken();
 // Do something before request is sent
 config.headers.Accept = "application/json"
 if(token !== null && token !== "undefined"){
      config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
}, function (error) {
 // Do something with request error
 return Promise.reject(error);
});

// Auth refresh logic
const refreshAuthLogic = async (failedRequest:any) => {
  try {
    // await auth.cookie();
    console.log('refresh token or push to login?')
    return Promise.resolve();
  } catch (error) {
    // If refreshing token fails, redirect to login page
    console.log('not authed')
    const authStore = useAuthStore();
    authStore.clearAuth();
  
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(request, refreshAuthLogic, { statusCodes: [401, 419] });

// API methods
const message = {
  send: async (text: string) => {
    await request.post('/api/message', { message: text || 'Hullo there!' });
  },

  get: async (message_id: number | null = null) => {
      if(message_id){
        return request.get(`/api/message/${message_id}`);
      }else{
        const response = await request.get('/api/message');
        return response.data;
      }
  }

};

const auth = {
  broadcasting: async (channel: any, socketId: any, callback: any) => {
    return request.post('/broadcasting/auth', {
      socket_id: socketId,
      channel_name: channel.name
    })
      .then(response => {
        console.log('ws connected')
        callback(false, response.data);
      })
      .catch(error => {
        console.log('ws failed')
        callback(true, error);
      });
  },
  login: async (username: string = import.meta.env.VITE_LARAVEL_EMAIL, password: string = import.meta.env.VITE_LARAVEL_PASS, deviceName: string = 'aioli-electron') => {
    const response = await request.post('/api/sanctum/token', {
      email: username,
      password: password,
      device_name: deviceName,
    });
    request.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
    return response.data;
  },
  getUser: async () => {
    return request.get('/api/user');
  },
  logout: async () => {
    const response = await request.post('/api/sanctum/logout');
    return response.data;
  },
  register: async (username: string, password: string) => {
    const response = await request.post('/register', { username, password });
    return response.data;
  }
};

// Exporting API
export const api = {
  auth,
  message
};