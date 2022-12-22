<script setup lang="ts">
import router from '@/router';
import { onMounted, ref } from 'vue';
import Month from '../../Month.vue';

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
  <div class="bg-white cursor-pointer grid grid-cols-2" @click="go()">
    <h1>Calendar View</h1>
    <div class="">
      <Month class=""></Month>
    </div>
  </div>
</template>
