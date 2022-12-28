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
      <div class="md:p-8 p-5 rounded-t">
        <div class="flex items-center justify-center">
          <span
            tabindex="0"
            class="focus:outline-none text-2xl dark:text-gray-100 text-gray-800"
            >{{ moment().format('MMMM yy') }}</span
          >
        </div>
        <div class="flex pt-4 overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr>
                <th v-for="idx in 7">
                  <div class="w-full flex justify-center">
                    <p
                      class="text-xs font-medium text-center text-gray-800 dark:text-gray-100"
                    >
                      {{
                        moment()
                          .day(idx - 1)
                          .format('ddd')
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
                    class="px-2 py-2 cursor-pointer flex w-full justify-center"
                  >
                    <p
                      class="text-base text-gray-500 dark:text-gray-100 font-medium"
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
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:bg-white hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-cyan-400 bg-white rounded-full;
}
</style>
