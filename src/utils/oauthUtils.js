// Deprecated in favor of using stores/auth.js

// utils/oauthUtils.js
import {ref, reactive } from 'vue'
// import { storeToRefs } from 'pinia'
// import { useUserStore } from '../stores/user';
// const store = useUserStore()
// const { user } = storeToRefs(store)
const appUrl = import.meta.env.VITE_LARAVEL_APP_URL;
const redirectUri = import.meta.env.VITE_OAUTH_REDIRECT_URL;

const requestAccessToken = async(userData = {}) => {
  try {
    const response = await fetch(import.meta.env.VITE_LARAVEL_APP_URL +'oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'password',
        client_id: import.meta.env.VITE_LARAVEL_CLIENT_ID, // Replace with your client ID
        client_secret: import.meta.env.VITE_LARAVEL_CLIENT_SECRET, // Replace with your client secret
        username: userData.email ?? import.meta.env.VITE_LARAVEL_USER_EMAIL,
        password: userData.password ?? import.meta.env.VITE_LARAVEL_USER_PASSWORD,
        //redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI,
        //code: code,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Handle the response, e.g., save the access token
      const store = await storeAccessToken(data.access_token);
      if(store){
         getUserData();
        //tokenAcquired.value = true
      }
    } else {
      throw new Error('Error requesting access token');
    }
  } catch (error) {
    console.error('Error requesting access token:', error);
  }
}

const storeAccessToken = async (accessToken) => {
  try {
    await localStorage.setItem('accessToken', accessToken)
    //console.log('Access token stored successfully.');
    return true;
  } catch (error) {
    console.error('Error storing access token:', error);
  }
}

const getAccessToken = async () => {
  try {
    const accessToken = await localStorage.getItem("accessToken");
    return accessToken;
  } catch (error) {
    console.error('Error retrieving access token:', error);
  }
}

const getUserData = async () => {
  
  const accessToken = await getAccessToken()
  const apiUrl = import.meta.env.VITE_LARAVEL_APP_URL + 'api/user';
  
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      const data = await response.json()
      // user.value = JSON.stringify(userData)
      localStorage.setItem('user', JSON.stringify(data))
      // If user data needs to be reactive. set it to user.data and create a watcher in your vue file. import user into that file. 
      userData.data = data;
      // Use the user data in your Electron app, e.g., set up the user session, display user information, etc.
    } else {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }
  } catch (error) {
  console.error('Error getting user data:', error);
  // Handle the error, e.g., show an error message to the user, retry fetching the data, or prompt the user to log in again
  }
}

const logout = async () => {
  //const accessToken = await keytar.getPassword('WordscapeAccessToken', import.meta.env.VITE_APP_NAME);
  const accessToken = await getAccessToken()
  // Revoke the access token
  try {
    const response = await fetch(appUrl + 'api/oauth/revoke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error revoking access token: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error revoking access token:', error);
    // Handle the error, e.g., show an error message to the user or try revoking the token again
  }
  // Remove the access token and any other sensitive user information from Keytar
  //await keytar.deletePassword('WordscapeAccessToken', import.meta.env.VITE_APP_NAME);
  await localStorage.removeItem("accessToken");
  await localStorage.removeItem("user");
  //userData.data = {};
  //userData.data = {};
  //tokenAcquired.value = false 
}

// let tokenAcquired = ref(false)
let userData = reactive({
  data: JSON.parse(localStorage.getItem('user') ?? '[]')
});

export {
  requestAccessToken,
  getAccessToken,
  logout,
  userData,
};
