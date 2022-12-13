<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

const button = 'MyButton';
</script>

<template>
  <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>
