<script setup lang="ts">
import { ref } from 'vue';

export interface CardWidgetResponseData {
  title?: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
}

const props = defineProps<CardWidgetResponseData>();
const imageUrl = ref(`url('${props.imageUrl}')`);
</script>

<template>
  <div class="bg-cover bg-center bg-image flex flex-col">
    <div
      v-if="props.title"
      class="p-4 text-2xl font-light text-white mt-auto w-full bg-black/50 items-end"
    >
      {{ props.title }}
    </div>
  </div>
</template>

<style scoped>
.bg-image {
  background-image: v-bind(imageUrl);
}
</style>
