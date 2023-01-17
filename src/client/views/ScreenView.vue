<script setup lang="ts">
import axios from 'axios';
import { componentClassFromString } from '@/services/component-map';
import type { ScreenResponseData } from 'src/common/dto/screen-response-data';
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue';
import router from '../router';

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
</script>

<template>
  <div class="">
    <component
      v-if="screenResponse"
      v-bind:is="componentClassFromString(screenResponse.layout)"
      v-bind="screenResponse"
      class="h-full"
      @reload="reloadHandler()"
    ></component>
    <div class="absolute top-0 right-0 text-white text-xs">
      v{{ screenResponse?.version }}
    </div>
  </div>
</template>
