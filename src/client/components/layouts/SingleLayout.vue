<script setup lang="ts">
import { componentClassFromString } from '@/services/component-map';

export interface InternalSingleLayoutResponseData {
  main: any;
}

const props = defineProps<InternalSingleLayoutResponseData>();
</script>

<template>
  <div class="w-screen flex flex-row h-full">
    <component
      v-if="props !== null"
      v-bind:is="componentClassFromString(props.main.componentName)"
      v-bind="props.main"
      class="h-full"
    ></component>
  </div>
</template>
