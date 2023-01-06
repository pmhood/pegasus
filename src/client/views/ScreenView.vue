<script setup lang="ts">
import axios from 'axios';
import { componentClassFromString } from '@/services/component-map';
import type { ScreenResponseData } from 'src/common/dto/screen-response-data';
import { ref } from 'vue';

let screenResponse = ref<ScreenResponseData>();

await refreshScreen();

async function refreshScreen() {
  const response = await axios.get('/api/screens/home');
  screenResponse.value = response.data as ScreenResponseData;

  if (screenResponse.value.refreshInterval) {
    setTimeout(() => {
      refreshScreen();
    }, screenResponse.value.refreshInterval);
  }
}
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
