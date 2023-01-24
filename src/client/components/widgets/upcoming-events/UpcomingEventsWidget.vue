<script setup lang="ts">
import router from '@/router';
import moment from 'moment';
import type { BucketedEvents } from 'src/common/dto/home-screen-response';
import { toRefs } from 'vue';
import Month from '../../Month.vue';

export interface UpcomingEventsWidgetDataInternal {
  events: BucketedEvents;
}
const props = defineProps<UpcomingEventsWidgetDataInternal>();
const { events } = toRefs(props);

function go() {
  router.push('calendar');
}
</script>

<template>
  <div
    class="h-full cursor-pointer grid grid-cols-3 bg-gradient-to-b from-blue-500 to-cyan-400 overflow-auto"
    @click="go()"
  >
    <div class="col-span-2 overflow-auto">
      <div
        v-for="day in Object.keys(events).sort()"
        :key="day"
        class="p-2 flex flex-col gap-4"
      >
        <div>
          <span class="text-white/50 text-xs">{{
            moment(day).format('dddd, MMMM DD, YYYY')
          }}</span>
        </div>
        <div class="flex flex-col gap-4">
          <div
            v-for="event in props.events[day]"
            :key="event.id"
            class="border-l-8 border-white/25 rounded-tl-md rounded-bl-md flex flex-col p-2"
            :class="[
              moment().isBetween(event.start, event.end, 'minutes', '[]')
                ? 'now'
                : ''
            ]"
          >
            <div
              class="text-lg font-medium"
              :class="[
                moment().isBetween(event.start, event.end, 'minutes', '[]')
                  ? 'now-text'
                  : 'not-now-title'
              ]"
            >
              {{ event.title }}
            </div>
            <div
              class="w-18 text-xs text-white/50"
              :class="[
                moment().isBetween(event.start, event.end, 'minutes', '[]')
                  ? 'now-text'
                  : 'not-now-title'
              ]"
            >
              {{ moment(event.start).format('hh:mm a') }} -
              {{ moment(event.end).format('hh:mm a') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-cyan-400/25 col-start-3">
      <Month class=""></Month>
    </div>
  </div>
</template>

<style scoped>
.now {
  @apply bg-white;
}

.now-text {
  @apply text-blue-400;
}
.not-now-title {
  @apply text-white;
}
</style>
