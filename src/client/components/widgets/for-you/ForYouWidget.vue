<script setup lang="ts">
import moment from 'moment';
import { ref } from 'vue';

export interface ForYouWidgetData {
  imageUrl?: string;
}

const props = defineProps<ForYouWidgetData>();
const imageUrl = ref(`url('${props.imageUrl}')`);
const currentDateTime = ref(moment());
setInterval(() => {
  currentDateTime.value = moment();
}, 1000);
</script>
<template>
  <div class="flex flex-col">
    <div class="p-4 mt-auto w-full">
      <div
        class="text-xl font-light text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]"
      >
        {{ currentDateTime.format('dddd, MMMM DD') }}
      </div>
      <div
        class="text-6xl font-bold text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]"
      >
        <span>{{ currentDateTime.format('h') }}</span
        ><span class="animate-pulse-colon">:</span
        ><span>{{ currentDateTime.format('mm a') }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-image {
  background-image: v-bind(imageUrl);
}
@keyframes pulse {
  50% {
    opacity: 0.1;
  }
}
.animate-pulse-colon {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
