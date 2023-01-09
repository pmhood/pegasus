<script setup lang="ts">
import { ref } from 'vue';
import { CardWidgetType } from '../../../common/dto/card-widget-type';

export interface CardWidgetResponseData {
  title?: string;
  type?: CardWidgetType;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
}

const props = defineProps<CardWidgetResponseData>();
const imageUrl = ref(`url('${props.imageUrl}')`);
</script>

<template>
  <div
    v-if="props.type === CardWidgetType.ImageWithText"
    class="bg-cover bg-center bg-image flex flex-col h-full bg-gradient-to-br from-emerald-700 to-emerald-50"
  >
    <div
      v-if="props.title"
      class="p-4 pt-16 text-sm font-semibold text-white mt-auto w-full bg-gradient-to-t from-black via-black/75 to-transparent items-end"
    >
      {{ props.title }}
    </div>
  </div>

  <div
    v-else-if="props.type === CardWidgetType.TextOverlay"
    class="flex flex-col h-full w-full text-2xl bg-gradient-to-br from-emerald-700 to-emerald-50 p-4 text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.8)] justify-center items-center"
  >
    {{ props.title }}
  </div>
</template>

<style scoped>
.bg-image {
  background-image: v-bind(imageUrl);
}
</style>
