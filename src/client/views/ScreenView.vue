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

function goToHabitica() {
  router.push('site');
}
</script>

<template>
  <div
    class="w-screen h-screen grid grid-rows-[64px] background bg-blend-screen bg-slate-400"
  >
    <header class="navbar bg-slate-100 border-b-1 border-slate-500 h-16">
      <div class="navbar-start divide-x-2 divde-black">
        <button class="px-4">
          <HomeIcon class="h-6 w-6 text-slate-800" />
        </button>

        <h3 class="font-semibold px-4"></h3>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end divide-x-2">
        <h4 class="p-4">
          <button @click="goToHabitica()">
            <img
              alt="Vue logo"
              class="logo"
              src="@/assets/habitica.jpg"
              width="32"
              height="32"
            />
          </button>
        </h4>

        <h4 class="text-slate-600 p-4">
          <InformationCircleIcon class="h-8 text-slate-800" />
        </h4>
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
  background-image: url('/images/hans-peter-traunig-MwNu9o6u9Gk-unsplash.jpg');
}
</style>
