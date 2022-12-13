<script setup lang="ts">
import { onMounted, ref } from 'vue';

export interface PhotoOfTheDayData {
  imageUrl: string;
  photographer: string;
}

const props = defineProps<PhotoOfTheDayData>();
console.log(props);
const imageUrl = ref(`url('${props.imageUrl}')`);
const photographer = ref(props.photographer);
</script>
<template>
  <div class="bg-cover bg-center bg-image">
    <h1>Photo Of The Day</h1>
    <p>{{ photographer }}</p>
  </div>
</template>

<style>
.bg-image {
  background-image: v-bind(imageUrl);
}
</style>
