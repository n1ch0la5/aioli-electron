<script setup lang="ts">
import { ref, watch, computed } from "vue"
import HelloWorld from './components/HelloWorld.vue'
import HeaderNav from './components/HeaderNav.vue'

// const { campaigns, selectedCampaign } = storeToRefs(campaignStore)
// const { fetchCampaigns, createCampaign } = campaignStore

console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
//let loggedIn = ref(false)

// watch(
//   () => user.data,
//   (newValue) => {
//     localStorage.setItem('user', JSON.stringify(newValue));
//     if(Object.keys(newValue).length){
//       loggedIn.value = true
//     }else{
//       loggedIn.value = false
//     }
//   }
// );
</script>

<template>
  <HeaderNav />
  <div class="flex justify-center items-center">
    <a href="https://www.electronjs.org/" target="_blank">
      <img src="./assets/electron.svg" class="logo electron" alt="Electron logo" />
    </a>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Electron + Vite + Vue" />
  <div class="flex-center">
    Place static files into the <code>/public</code> folder
    <img style="width:5em;" src="/node.svg" alt="Node logo">
  </div>
</template>

<style>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9FEAF9);
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
