<script setup lang="ts">
import type { Photo } from 'src/common/dto/home-screen-response';
import { onMounted, ref } from 'vue';

export interface PhotoOfTheDayData {
  photo?: Photo;
}

const props = defineProps<PhotoOfTheDayData>();
console.log(props.photo?.url);
const url = ref(props.photo?.url);
const imageUrl = ref(`url('${props.photo?.url}')`);
const photographer = ref(props.photo?.photographer);
</script>
<template>
  <div class="bg-cover bg-center bg-image flex flex-col">
    <div
      class="p-4 text-2xl font-light text-white mt-auto w-full bg-black/50 items-end"
    >
      {{ photographer }}
    </div>
  </div>
</template>

<style scoped>
.bg-image {
  background-image: v-bind(imageUrl);
}
</style>
