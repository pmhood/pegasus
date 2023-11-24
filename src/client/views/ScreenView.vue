<script setup lang="ts">
import axios from 'axios';
import { componentClassFromString } from '@/services/component-map';
import type { ScreenResponseData } from 'src/common/dto/screen-response-data';
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue';
import router from '../router';
import { HomeIcon } from '@heroicons/vue/24/solid';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';

let screenResponse = ref<ScreenResponseData>();
let intervalId: any;
const imageUrl = ref();

await refreshScreen();

async function refreshScreen() {
  const routeName = router.currentRoute.value.name;

  console.log(`Refresh screen ${routeName?.toString()}`);
  const response = await axios.get(`/api/screens/${routeName?.toString()}`);
  screenResponse.value = response.data as ScreenResponseData;

  if (screenResponse.value?.refreshInterval) {
    console.log(`Refreshing in ${screenResponse.value.refreshInterval}ms`);
    intervalId = setTimeout(() => {
      refreshScreen();
    }, screenResponse.value.refreshInterval);
  } else {
    console.warn(`No refresh interval found`);
  }

  imageUrl.value = `url('${screenResponse.value?.backgroundUrl}')`;
  // imageUrl.value = `url('https://images.pexels.com/photos/5137655/pexels-photo-5137655.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')`;
}

onMounted(() => {
  console.log(`onMounted = ScreenView`);
});
onUnmounted(() => {
  console.log(`onUnmounted = ScreenView`);
});
onActivated(() => {
  console.log(`onActivated = ScreenView`);
});
onDeactivated(() => {
  console.log(`onDeactivated = ScreenView`);

  clearInterval(intervalId);
  intervalId = null;
});

async function reloadHandler() {
  clearInterval(intervalId);
  intervalId = null;

  await refreshScreen();
}

function goToMealie() {
  router.push('site');
}
</script>

<template>
  <div
    class="w-screen h-screen grid grid-rows-[64px] background backdrop-blur-sm"
  >
    <div class="absolute inset-0 w-full h-full bg-slate-900/50"></div>
    <header
      class="navbar border-b-1 border-slate-500 h-16 bg-gradient-to-b from-slate-900/40 to-slate-900/0"
    >
      <div class="navbar-start divide-x-2 divde-black">
        <button class="p-4">
          <HomeIcon class="h-6 w-6 text-white" />
        </button>

        <h3 class="font-semibold px-4"></h3>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end divide-x-2">
        <h4 class="p-4">
          <button class="p-4" @click="goToMealie()">
            <img
              alt="Mealie"
              class="logo bg-blend-screen"
              src="@/assets/mealie_white.png"
              width="32"
              height="32"
            />
          </button>
        </h4>

        <!-- <h4 class="text-slate-600 p-4">
          <InformationCircleIcon class="h-8 text-slate-800" />
        </h4> -->
      </div>
    </header>
    <main class="h-[576px] flex items-center">
      <component
        v-if="screenResponse"
        v-bind:is="componentClassFromString(screenResponse.layout)"
        v-bind="screenResponse"
        @reload="reloadHandler()"
      ></component>
    </main>
  </div>
</template>

<style scoped>
.background {
  @apply bg-cover;
  /* background-image: url('/images/hans-peter-traunig-MwNu9o6u9Gk-unsplash.jpg'); */
  background-image: v-bind(imageUrl);
}
</style>
