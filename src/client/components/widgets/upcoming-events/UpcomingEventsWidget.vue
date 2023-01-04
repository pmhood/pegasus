<script setup lang="ts">
import router from '@/router';
import moment from 'moment';
import type { FullCalendarEvent } from 'src/common/dto/full-calendar-event';
import type { BucketedEvents } from 'src/common/dto/home-screen-response';
import Month from '../../Month.vue';

export interface UpcomingEventsWidgetDataInternal {
  events: BucketedEvents;
}
const props = defineProps<UpcomingEventsWidgetDataInternal>();
const sortedDays = Object.keys(props.events).sort();

function go() {
  router.push('calendar');
}
</script>

<template>
  <div class="cursor-pointer flex flex-row" @click="go()">
    <div class="flex flex-col basis-4/5 overflow-auto">
      <div v-for="day in sortedDays" class="p-2 flex flex-col gap-4">
        <div>
          <span class="text-white/50 text-xs">{{
            moment(day).format('dddd, MMMM DD, YYYY')
          }}</span>
        </div>
        <div class="flex flex-col gap-4">
          <div
            v-for="event in props.events[day]"
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

    <div class="basis-1/5 h-auto bg-cyan-400/25">
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
