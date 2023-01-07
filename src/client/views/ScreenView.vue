<script setup lang="ts">
import axios from 'axios';
import { componentClassFromString } from '@/services/component-map';
import type { ScreenResponseData } from 'src/common/dto/screen-response-data';
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue';

let screenResponse = ref<ScreenResponseData>();
let intervalId: any;

await refreshScreen();

async function refreshScreen() {
  const response = await axios.get('/api/screens/home');
  screenResponse.value = response.data as ScreenResponseData;
}

onMounted(() => {
  console.log(`onMounted = ScreenView`);
});
onUnmounted(() => {
  console.log(`onUnmounted = ScreenView`);
});
onActivated(() => {
  console.log(`onActivated = ScreenView`);

  if (screenResponse.value?.refreshInterval) {
    console.log(`Refreshing in ${screenResponse.value.refreshInterval}ms`);
    intervalId = setInterval(() => {
      refreshScreen();
    }, screenResponse.value.refreshInterval);
  }
});
onDeactivated(() => {
  console.log(`onDeactivated = ScreenView`);

  clearInterval(intervalId);
  intervalId = null;
});
</script>

<template>
  <div class="">
    <component
      v-if="screenResponse"
      v-bind:is="componentClassFromString(screenResponse.layout)"
      v-bind="screenResponse"
      class="h-full"
    ></component>
    <div class="absolute top-0 right-0 text-white text-xs">
      v{{ screenResponse?.version }}
    </div>
  </div>
</template>
