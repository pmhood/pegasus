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
import type { HomeScreenResponse } from 'src/common/dto/home-screen-response';
// import { HomeScreenResponse } from '../../common/dto/home-response';

const now = new Date();
const hours = now.getHours() % 12;
const timeString = (hours ? hours : 12) + ':' + now.getMinutes();
// let thirdWidget = ref(null);
// let thirdWidgetProps = ref(null);
let widgets = ref([] as any[]);

const response = await axios.get('/api/screens/home');
console.log(response.data);
const homeScreenResponse = response.data as HomeScreenResponse;
// const h = response.data.homeScreen;
// console.log(h);
// thirdWidget.value = `<component :is=${homescreen.data.homeScreen.widgets[0].componentName} />`;
// const classObj = homescreen.data.homeScreen.widgets[0].componentName as string;

// thirdWidget.value = markRaw(componentClasses[classObj]);
// thirdWidgetProps.value = markRaw(homescreen.data.homeScreen.widgets[0].data);

// widgets.value = markRaw(homescreen.data.homeScreen.widgets as any);
// });
</script>

<template>
  <Suspense>
    <template #default>
      <main>
        <div class="h-screen w-screen flex flex-row">
          <div class="basis-2/5 bg-blue-800">
            <component
              v-if="widgets !== null"
              v-bind:is="
                componentClassFromString(
                  homeScreenResponse.widgets.leftWidget?.componentName ?? ''
                )
              "
              v-bind="homeScreenResponse.widgets.leftWidget?.data"
              class="h-full"
            ></component>
          </div>
          <div
            class="basis-3/5 p-4 h-auto grid gap-2 grid-rows-2 bg-gradient-to-r from-blue-800 to-indigo-900"
          >
            <component
              class="rounded-md drop-shadow-md bg-gradient-to-b from-blue-500 to-cyan-400"
              v-bind:is="
                componentClassFromString(
                  homeScreenResponse.widgets.rightTopWidget?.componentName ?? ''
                )
              "
              v-bind="homeScreenResponse.widgets.rightTopWidget?.data"
            ></component>
            <div class="h-auto grid gap-2 grid-cols-2">
              <component
                class="rounded-sm"
                v-bind:is="
                  componentClassFromString(
                    homeScreenResponse.widgets.rightBottomLeftWidget
                      ?.componentName ?? ''
                  )
                "
                v-bind="homeScreenResponse.widgets.rightBottomLeftWidget?.data"
              ></component>
              <component
                class="rounded-sm"
                v-bind:is="
                  componentClassFromString(
                    homeScreenResponse.widgets.rightBottomRightWidget
                      ?.componentName ?? ''
                  )
                "
                v-bind="homeScreenResponse.widgets.rightBottomRightWidget?.data"
              ></component>
            </div>
          </div>
        </div>
        <div class="absolute top-0 right-0 text-white text-xs">
          v{{ homeScreenResponse.version }}
        </div>
      </main>
    </template>
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>
