<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid';
import router from '../router';
import { ref } from 'vue';

const iframe: any = ref(null);
const frameSrc = ref('https://mealie.fakerainbow.com');

function close() {
  const historyLength = window.history.length - 1;
  for (let i = 0; i < historyLength - 1; ++i) {
    router.go(-1);
  }
}
</script>

<template>
  <div
    class="w-screen h-screen grid grid-rows-[64px] background bg-blend-screen bg-slate-400"
  >
    <header class="navbar bg-slate-100 border-b-1 border-slate-500 h-16">
      <div class="navbar-start divide-x-2">
        <button class="px-4" @click="close()">
          <XMarkIcon class="h-8 w-8 text-slate-800" />
        </button>

        <h3 class="font-semibold px-4"></h3>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end divide-x-2"></div>
    </header>
    <main class="h-full">
      <iframe class="h-full w-full" ref="iframe" :src="frameSrc"></iframe>
    </main>
  </div>
</template>
