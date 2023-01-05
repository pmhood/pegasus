<script setup lang="ts">
import axios from 'axios';
import { markRaw, onMounted } from 'vue';
import LoremIpsum from '../components/LoremIpsum.vue';
import MyButton from '../components/MyButton.vue';
import { ref } from 'vue';
import {
  componentClasses,
  componentClassFromString
} from '@/services/component-map';
import type { HomeScreenResponse } from 'src/common/dto/home-screen-response';
import type { ScreenResponseData } from 'src/common/dto/screen-response-data';

const now = new Date();
const hours = now.getHours() % 12;
const timeString = (hours ? hours : 12) + ':' + now.getMinutes();
let widgets = ref([] as any[]);

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
