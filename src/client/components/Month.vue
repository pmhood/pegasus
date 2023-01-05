<script setup lang="ts">
import moment, { type Moment } from 'moment';
import { ref } from 'vue';

const startWeek = moment().startOf('month').week();
const endWeek = moment().endOf('month').startOf('day').week();
const numWeeks = endWeek - startWeek + 1;

const calendarDates = [] as Moment[];
for (let i = 0; i < numWeeks * 7; i++) {
  calendarDates.push(moment().startOf('month').startOf('week').add(i, 'd'));
}
</script>

<template>
  <div class="flex items-center justify-end">
    <div class="max-w-sm w-full">
      <div class="p-4 rounded-t">
        <div class="flex items-center justify-center">
          <span tabindex="0" class="text-white/50">{{
            moment().format('MMMM yy')
          }}</span>
        </div>
        <div class="flex pt-4 overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr>
                <th v-for="idx in 7">
                  <div class="w-full flex justify-center">
                    <p class="text-xs font-semibold text-center text-white/50">
                      {{
                        moment()
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
              <tr v-for="weekNum in numWeeks">
                <td
                  v-for="(item, index) in calendarDates.slice(
                    (weekNum - 1) * 7,
                    (weekNum - 1) * 7 + 7
                  )"
                >
                  <div
                    class="px-1 py-1 cursor-pointer flex w-full justify-center"
                  >
                    <p
                      class="text-xs text-white"
                      :class="{
                        nonCurrentMonth: item.month() !== moment().month(),
                        today: moment(item).isSame(moment(), 'd')
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
