<script setup lang="ts">
import axios from 'axios';
import { markRaw, onMounted } from 'vue';
import LoremIpsum from '../components/LoremIpsum.vue';
import MyButton from '../components/MyButton.vue';
import { ref } from 'vue';
import {
  componentClasses,
  componentClassFromString
} from '@/services/component-map';
import RelevantWidget from '@/components/widgets/relevant/RelevantWidget.vue';

const now = new Date();
const hours = now.getHours() % 12;
const timeString = (hours ? hours : 12) + ':' + now.getMinutes();
let homescreen: any;
let thirdWidget = ref(null);
let thirdWidgetProps = ref(null);
let widgets = ref([] as any[]);

homescreen = await axios.get('/api/screens/home');
console.log(homescreen.data);
const h = homescreen.data.homeScreen;
console.log(h);
// thirdWidget.value = `<component :is=${homescreen.data.homeScreen.widgets[0].componentName} />`;
const classObj = homescreen.data.homeScreen.widgets[0].componentName as string;

thirdWidget.value = markRaw(componentClasses[classObj]);
thirdWidgetProps.value = markRaw(homescreen.data.homeScreen.widgets[0].data);

widgets.value = markRaw(homescreen.data.homeScreen.widgets as any);
// });
</script>

<template>
  <Suspense>
    <template #default>
      <main>
        <!-- <div class="bg-blue-500 h-screen w-screen grid gap-4 grid-cols-2"> -->
        <div class="h-screen w-screen grid grid-cols-2">
          <!-- <div
            class="bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1668934805187-359213a84c9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODYzOTR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzAyNjEyMTY&ixlib=rb-4.0.3&q=80&w=1080')]"
          >
            <div
              class="text-7xl font-bold absolute top-0 left-0 bg-slate-200 z-50"
            >
              <p>{{ timeString }}</p>
            </div>
            <MyButton></MyButton>
            <RouterLink to="/calendar">Calendar</RouterLink>
          </div> -->
          <component
            v-if="widgets !== null"
            v-bind:is="componentClassFromString(widgets[0].componentName)"
          ></component>

          <div
            class="pl-2 h-auto grid gap-2 grid-rows-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500"
          >
            <component
              v-if="thirdWidget !== ''"
              v-bind:is="componentClassFromString(widgets[1].componentName)"
            ></component>
            <div class="h-auto grid gap-2 grid-cols-2">
              <component
                v-if="thirdWidget !== ''"
                v-bind:is="componentClassFromString(widgets[2].componentName)"
                v-bind="widgets[2].data"
              ></component>
              <!-- <div class="bg-pink-500 h-auto"> -->
              <component
                v-if="thirdWidget !== ''"
                v-bind:is="componentClassFromString(widgets[2].componentName)"
                v-bind="widgets[2].data"
              ></component>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </main>
    </template>
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>
