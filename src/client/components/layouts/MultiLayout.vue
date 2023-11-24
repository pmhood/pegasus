<script setup lang="ts">
import { componentClassFromString } from '@/services/component-map';

export interface MultiLayoutResponseData {
  left: any;
  rightTop: any;
  rightBottomLeft: any;
  rightBottomRight: any;
}

const props = defineProps<MultiLayoutResponseData>();
const emit = defineEmits(['reload']);

function reloadHandler() {
  emit('reload');
}
</script>

<template>
  <!-- <div class=""> -->
  <div class="grid grid-cols-3 gap-2 mx-auto grid-rows-[272px_272px]">
    <!-- Left Side -->
    <div class="row-span-2">
      <component
        v-if="props.left !== null"
        v-bind:is="componentClassFromString(props.left.componentName ?? '')"
        v-bind="props.left"
        class="h-full"
        @reload="reloadHandler()"
      ></component>
    </div>

    <!-- Right Side -->
    <!-- Top -->
    <div class="col-start-2 col-span-2 h-full">
      <component
        class="rounded-lg drop-shadow-md"
        v-bind:is="componentClassFromString(props.rightTop.componentName ?? '')"
        v-bind="props.rightTop"
        @reload="reloadHandler()"
      ></component>
    </div>
    <!-- Bottom Left -->
    <div class="col-start-2 h-full">
      <component
        class="rounded-lg drop-shadow-md"
        v-bind:is="
          componentClassFromString(props.rightBottomLeft.componentName ?? '')
        "
        v-bind="props.rightBottomLeft"
        @reload="reloadHandler()"
      ></component>
    </div>
    <!-- Bottom Right -->
    <div class="col-start-3 h-full">
      <component
        class="rounded-lg drop-shadow-md"
        v-bind:is="
          componentClassFromString(props.rightBottomRight.componentName ?? '')
        "
        v-bind="props.rightBottomRight"
        @reload="reloadHandler()"
      ></component>
    </div>
  </div>
  <!-- </div> -->
</template>
