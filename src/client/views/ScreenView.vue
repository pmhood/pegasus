<script setup lang="ts">
import axios from 'axios';
import { componentClassFromString } from '@/services/component-map';
import type { ScreenResponseData } from 'src/common/dto/screen-response-data';
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue';
import router from '../router';
import { HomeIcon } from '@heroicons/vue/24/solid';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';
import { onLongPress } from '@vueuse/core';

let screenResponse = ref<ScreenResponseData>();
let intervalId: any;
const imageUrl = ref();

await refreshScreen();

async function refreshScreen() {
  const routeName = router.currentRoute.value.name;

  console.log(`Refresh screen ${routeName?.toString()}`);
  const response = await axios.get(`/api/screens/${routeName?.toString()}`);
  screenResponse.value = response.data as ScreenResponseData;

  if (screenResponse.value?.refreshInterval) {
    console.log(`Refreshing in ${screenResponse.value.refreshInterval}ms`);
    intervalId = setTimeout(() => {
      refreshScreen();
    }, screenResponse.value.refreshInterval);
  } else {
    console.warn(`No refresh interval found`);
  }

  imageUrl.value = `url('${screenResponse.value?.backgroundUrl}')`;
  // imageUrl.value = `url('https://images.pexels.com/photos/5137655/pexels-photo-5137655.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')`;
}

onMounted(() => {
  console.log(`onMounted = ScreenView`);
});
onUnmounted(() => {
  console.log(`onUnmounted = ScreenView`);
});
onActivated(() => {
  console.log(`onActivated = ScreenView`);
});
onDeactivated(() => {
  console.log(`onDeactivated = ScreenView`);

  clearInterval(intervalId);
  intervalId = null;
});

async function reloadHandler() {
  clearInterval(intervalId);
  intervalId = null;

  await refreshScreen();
}

function goToMealie() {
  router.push('site');
}

const htmlRefHook = ref<HTMLElement | null>(null);
const modalRef = ref<any | null>(null);
const longPressedHook = ref(false);

function onLongPressCallbackHook(e: PointerEvent) {
  longPressedHook.value = true;
  console.log(`long press`);
  modalRef.value?.showModal();
}
function resetHook() {
  longPressedHook.value = false;
}

onLongPress(htmlRefHook, onLongPressCallbackHook, {
  modifiers: {
    prevent: true
  }
});
</script>

<template>
  <!-- <button class="btn" onclick="my_modal_2.showModal()">open modal</button> -->
  <div
    class="w-screen h-screen grid grid-rows-[64px] background backdrop-blur-sm"
    ref="htmlRefHook"
  >
    <div
      class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-900/50"
    ></div>

    <main class="h-screen flex items-center">
      <component
        v-if="screenResponse"
        v-bind:is="componentClassFromString(screenResponse.layout)"
        v-bind="screenResponse"
        @reload="reloadHandler()"
      ></component>
    </main>
  </div>

  <dialog id="my_modal_2" class="modal" ref="modalRef">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">Press ESC key or click outside to close</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped>
.background {
  @apply bg-cover;
  /* background-image: url('/images/hans-peter-traunig-MwNu9o6u9Gk-unsplash.jpg'); */
  background-image: v-bind(imageUrl);
}
</style>
