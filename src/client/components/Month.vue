<script setup lang="ts">
import moment from 'moment';
import { onMounted, onUnmounted, ref } from 'vue';

let intervalId: any = undefined;
let today = ref<moment.Moment>(moment());

let numWeeks = ref(0);
let calendarDates = ref<moment.Moment[]>([]);

onMounted(() => {
  refreshCalendar();
});

onUnmounted(() => {
  clearInterval(intervalId);
  intervalId = undefined;
});

function refreshCalendar() {
  today.value = moment();
  const startWeek = today.value.clone().startOf('month').week();
  const endWeek = today.value.clone().endOf('month').startOf('day').week();
  numWeeks.value = endWeek - startWeek + 1;

  calendarDates.value = [];
  for (let i = 0; i < numWeeks.value * 7; i++) {
    calendarDates.value.push(
      today.value.clone().startOf('month').startOf('week').add(i, 'd')
    );
  }

  const tomorrow = today.value.clone().startOf('d').add(1, 'd');
  const interval = tomorrow.diff(today.value, 'ms') + 300000;
  intervalId = setTimeout(() => {
    refreshCalendar();
  }, interval);
}
</script>

<template>
  <div class="flex items-center justify-end">
    <div class="max-w-sm w-full">
      <div class="p-4 rounded-t">
        <div class="flex items-center justify-center">
          <span tabindex="0" class="text-white/50"
            >{{ today.format('MMMM yy') }}
          </span>
        </div>
        <div class="flex pt-4 overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr>
                <th v-for="idx in 7" :key="idx">
                  <div class="w-full flex justify-center">
                    <p class="text-xs font-semibold text-center text-white/50">
                      {{
                        today
                          .clone()
                          .day(idx - 1)
                          .format('dd')
                          .toUpperCase()
                      }}
                    </p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="weekNum in numWeeks" :key="weekNum">
                <td
                  v-for="(item, index) in calendarDates.slice(
                    (weekNum - 1) * 7,
                    (weekNum - 1) * 7 + 7
                  )"
                  :key="index"
                >
                  <div
                    class="px-1 py-1 cursor-pointer flex w-full justify-center"
                  >
                    <p
                      class="text-xs text-white"
                      :class="{
                        nonCurrentMonth: item.month() !== today.month(),
                        today: item.isSame(today, 'd')
                      }"
                    >
                      {{ item.format('D') }}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nonCurrentMonth {
  @apply text-slate-200/50;
}
/* .today {
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full;
} */
.today {
  @apply w-6 h-6 flex items-center justify-center font-medium text-cyan-400 bg-white rounded-full;
}
</style>
