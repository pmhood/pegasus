<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { componentClassFromString } from '@/services/component-map';
import type { ScreenResponseData } from 'src/common/dto/screen-response-data';

const now = new Date();
const hours = now.getHours() % 12;
const timeString = (hours ? hours : 12) + ':' + now.getMinutes();
let widgets = ref([] as any[]);

const response = await axios.get('/api/screens/calendar');
const screenResponse = response.data as ScreenResponseData;
</script>

<template>
  <div>
    <component
      v-bind:is="componentClassFromString(screenResponse.layout)"
      v-bind="screenResponse"
      class="h-full"
    ></component>
  </div>
</template>
