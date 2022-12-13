<script setup lang="ts">
import { FooService } from '@/services/foo.service';
import { ref } from 'vue';

const count = ref(0);
let imageUrl = ref();

async function clicked() {
  // count++;
  const foo = new FooService();
  const data = await foo.getPhotos();
  console.log(data);
  // imageUrl = new URL(data).href;
}

async function getPhotoUrl(): Promise<string> {
  const foo = new FooService();
  const data = await foo.getRandomPhoto();
  console.log(data);
  imageUrl.value = new URL(data).href;
  return data;
}
</script>

<template>
  <button @click="count++">Button was clicked {{ count }} times</button>
  <button @click="getPhotoUrl()">Load Photo</button>
  <img v-bind:src="imageUrl" />
</template>
