<script setup lang="ts">
import axios from 'axios';
import { componentClassFromString } from '@/services/component-map';
import type { ScreenResponseData } from 'src/common/dto/screen-response-data';

const response = await axios.get('/api/screens/home');
const screenResponse = response.data as ScreenResponseData;
</script>

<template>
  <div class="bg-red-500">
    <component
      v-bind:is="componentClassFromString(screenResponse.layout)"
      v-bind="screenResponse"
      class="h-full"
    ></component>
    <div class="absolute top-0 right-0 text-white text-xs">
      v{{ screenResponse.version }}
    </div>
  </div>
</template>
