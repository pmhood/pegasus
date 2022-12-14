<script setup lang="ts">
import router from '@/router';
import { onMounted, ref } from 'vue';

// export interface PhotoOfTheDayData {
//   imageUrl: string;
//   photographer: string;
// }

// const props = defineProps<PhotoOfTheDayData>();
// const imageUrl = ref(`url('${props.imageUrl}')`);
function go() {
  router.push('calendar');
}
</script>
<template>
  <div class="bg-red-200 cursor-pointer" @click="go()">
    <h1>Calendar View</h1>
  </div>
</template>
