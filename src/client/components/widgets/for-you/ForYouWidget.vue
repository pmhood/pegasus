<script setup lang="ts">
import moment from 'moment';
import type { Photo } from 'src/common/dto/home-response';
// import type { ForYouWidgetData } from '../../../../common/dto/home-response';
import { onMounted, ref } from 'vue';

export interface ForYouWidgetData {
  photo?: Photo;
}

const props = defineProps<ForYouWidgetData>();
const imageUrl = ref(`url('${props.photo?.url}')`);
const currentDateTime = ref(moment());
setInterval(() => {
  currentDateTime.value = moment();
}, 1000);
</script>
<template>
  <div class="bg-image bg-cover flex flex-col">
    <div class="p-10 mt-auto w-full bg-black/5">
      <div class="text-4xl font-light text-white drop-shadow-lg">
        {{ currentDateTime.format('dddd, MMMM DD') }}
      </div>
      <div class="text-8xl font-bold text-white">
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
