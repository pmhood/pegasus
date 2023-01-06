<script setup lang="ts">
import { ref, onMounted, onDeactivated } from 'vue';
import type { CardWidgetResponseData } from './Card.vue';
import Card from './Card.vue';

export interface InternalCarouselWidgetResponseData {
  componentName: string;
  transitionType: string;
  transitionTime: number;
  items: CardWidgetResponseData[];
}

const props = defineProps<InternalCarouselWidgetResponseData>();

const itemIndex = ref(0);
let intervalId: any;

onMounted(() => {
  intervalId = setInterval(() => {
    console.log('transition');
    itemIndex.value = (itemIndex.value + 1) % props.items.length;
  }, props.transitionTime);
});

onDeactivated(() => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
});
</script>

<template>
  <div class="bg-yellow-500 grid">
    <div
      v-for="[i, item] of props.items.entries()"
      :key="i"
      class="transition-opacity opacity-0 duration-1000 carousel-item"
      v-bind:class="[i === itemIndex ? 'active' : '']"
    >
      <Card v-bind="item"></Card>
    </div>
  </div>
</template>

<style scoped>
.active {
  @apply opacity-100;
}

.carousel-item {
  grid-column-start: 1;
  grid-row-start: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
