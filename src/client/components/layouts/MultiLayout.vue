<script setup lang="ts">
import { componentClassFromString } from '@/services/component-map';

export interface MultiLayoutResponseData {
  left: any;
  rightTop: any;
  rightBottomLeft: any;
  rightBottomRight: any;
}

const props = defineProps<MultiLayoutResponseData>();
</script>

<template>
  <div class="h-screen w-screen flex flex-row">
    <div class="basis-2/5 bg-blue-800">
      <component
        v-if="props.left !== null"
        v-bind:is="componentClassFromString(props.left.componentName ?? '')"
        v-bind="props.left"
        class="h-full"
      ></component>
    </div>
    <div
      class="basis-3/5 p-4 h-auto grid gap-2 grid-rows-2 bg-gradient-to-r from-blue-800 to-indigo-900"
    >
      <component
        class="rounded-md drop-shadow-md bg-gradient-to-b from-blue-500 to-cyan-400"
        v-bind:is="componentClassFromString(props.rightTop.componentName ?? '')"
        v-bind="props.rightTop"
      ></component>
      <div class="h-auto grid gap-2 grid-cols-2">
        <component
          class="rounded-sm"
          v-bind:is="
            componentClassFromString(props.rightBottomLeft.componentName ?? '')
          "
          v-bind="props.rightBottomLeft"
        ></component>
        <component
          class="rounded-sm"
          v-bind:is="
            componentClassFromString(props.rightBottomRight.componentName ?? '')
          "
          v-bind="props.rightBottomRight"
        ></component>
      </div>
    </div>
  </div>
</template>
