<script setup lang="ts">
import type { RssItem } from 'src/common/dto/rss-item';
import { ref } from 'vue';

export interface RssData {
  rssItem: RssItem[];
}

const props = defineProps<RssData>();
const rssItems = props.rssItem?.map((item) => {
  return {
    imageUrl: `url('${item.imageUrl}')`,
    description: item.description,
    title: item.title
  } as RssItem;
});
console.log(rssItems);

const firstItem = rssItems[0];

const imageUrl = ref(firstItem.imageUrl);
</script>
<template>
  <div class="bg-cover bg-center bg-image flex flex-col">
    <div
      class="p-4 text-2xl font-light text-white mt-auto w-full bg-black/50 items-end"
    >
      <p>
        {{ firstItem?.title }}
      </p>
      <p>
        {{ firstItem?.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.bg-image {
  background-image: v-bind(imageUrl);
}
</style>
