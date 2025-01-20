<script setup lang="ts">
// import '@fullcalendar/core/vdom'; // solves problem with Vite
import router from '@/router';
import type {
  CalendarApi,
  CalendarOptions,
  EventClickArg,
  EventContentArg
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/vue3';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/solid';
import moment from 'moment';
import type { FullCalendarEvent } from 'src/common/dto/full-calendar-event';
import { onMounted, ref } from 'vue';

export interface InternalCalendarWidgetResponseData {
  componentName: string;
  events: FullCalendarEvent[];
}

enum ViewType {
  Schedule = 'Schedule',
  Day = 'Day',
  Week = 'Week',
  Month = 'Month'
}
const fullCalendarType = {
  [ViewType.Schedule]: 'schedule',
  [ViewType.Month]: 'dayGridMonth',
  [ViewType.Week]: 'week',
  [ViewType.Day]: 'dayView'
};
const viewTypeDropdownItems = [
  ViewType.Month,
  ViewType.Week,
  ViewType.Day,
  ViewType.Schedule
];

const eventSources = ref<Set<string>>(
  new Set<string>(['holidays', 'hoodfamily'])
);

const props = defineProps<InternalCalendarWidgetResponseData>();
let currentEvents = props.events.filter((event) =>
  eventSources.value.has(event.sourceId || '')
);

const calendar = ref<any>(null);
let calendarApi: CalendarApi | undefined = undefined;

const currentlyShownDate = ref(moment());
const currentTime = ref(moment().format('h:mm A'));
let viewType = ViewType.Schedule;

const scheduleCalendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, rrulePlugin, listPlugin],
  allDayContent: 'all-day',
  allDaySlot: true,
  nowIndicator: true,
  initialDate: new Date(),
  showNonCurrentDates: false,
  initialView: fullCalendarType[viewType],
  dayHeaderClassNames: 'day-header',
  views: {
    week: {
      type: 'timeGrid',
      duration: { days: 5 },
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short',
        omitZeroMinute: true
      },
      dayHeaderContent: (arg) => {
        const dayOfWeek = moment(arg.date).format('ddd');
        const dayNumber = moment(arg.date).format('D');

        const div = document.createElement('div');
        div.className = 'py-3 font-normal text-slate-500 text-sm';
        div.innerHTML = `<span class=''>${dayOfWeek}</span>`;
        div.innerHTML += ` <span class='text-slate-900 font-semibold'>${dayNumber}</span>`;

        return { domNodes: [div] };
      }
    },
    dayView: {
      type: 'timeGridDay',
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short',
        omitZeroMinute: true
      },
      dayHeaderContent: (arg) => {
        const dateString = moment(arg.date).format('dddd, MMMM Do YYYY');

        const div = document.createElement('div');
        div.className = 'py-3 font-bold text-black text-sm';
        div.innerHTML = `<span class=''>${dateString}</span>`;

        return { domNodes: [div] };
      }
    },
    schedule: {
      type: 'listWeek',
      duration: { days: 7 },
      eventDidMount: function (info) {
        // Change background color of row
        // info.el.cl = info.event.classNames;
        const colorClass = getPersonCssClasses(
          info.event.title,
          info.event.extendedProps.sourceId
        ).replace('100', '50');
        info.el.className += ` ${colorClass} `;

        const dotEl = info.el.getElementsByClassName('fc-list-event-dot')[0];
        if (dotEl) {
          console.log(dotEl);
          dotEl.className = '';
        }
        // }
      }
    }
  },
  scrollTime: moment().subtract(1, 'h').format('HH:MM:00'),
  height: '100%',
  events: currentEvents,
  // eventTimeFormat: {
  //   hour: 'numeric',
  //   minute: '2-digit',
  //   meridiem: 'short'
  // },

  headerToolbar: false,

  slotLabelContent: (arg) => {
    return moment(arg.date).format('h a');
  },
  eventContent: (arg: EventContentArg) => {
    console.log(arg);
    let personCssClasses = getPersonCssClasses(
      arg.event.title,
      arg.event.extendedProps.sourceId
    ); //arg.event.extendedProps.sourceColor;
    let borderClass = personCssClasses
      .replace('100', '500')
      .replace('bg', 'border-l');
    let textColorClass = 'text-black';

    if (arg.event.allDay) {
      personCssClasses = personCssClasses.replace('100', '500');
      borderClass = borderClass.replace('300', '900');
      textColorClass = 'text-white';
    }

    // console.log(personCssClasses);
    const div = document.createElement('div');
    // let bgColor = arg.event.allDay
    //   ? `bg-${sourceColor}-300`
    //   : `bg-${sourceColor}-100`;
    let fontSize = '';

    switch (viewType) {
      case ViewType.Schedule:
        fontSize = 'text-xs';
        // bgColor = '';
        break;
      case ViewType.Month:
      case ViewType.Week:
        fontSize = 'text-[0.65rem]';
        break;
    }
    // console.log(arg);
    //border-l-${sourceColor}-400
    //text-${sourceColor}-900
    div.className = `${personCssClasses} ${borderClass} ${fontSize} ${textColorClass} text-wrap h-full w-full border-l-8  p-1 rounded-lg `;
    div.innerHTML = `<span class="">${arg.event.title}</span><br/><span class="">${arg.timeText}</span>`;

    // div.className = `flex flex-row text-wrap space-x-2 h-full w-full items-stretch bg-zinc-100`;
    // div.innerHTML = `<div class="w-2 bg-red-500">&nbsp;</div><div><span class="">${arg.event.title}</span><br/><span class="">${arg.timeText}</span></div>`;

    return { domNodes: [div] };
  }
};

async function refreshCalendar(): Promise<FullCalendarEvent[]> {
  //   const calendarResponse = await axios.get('/api/screens/calendar');
  //   const calScreenResponse = calendarResponse.data as CalendarScreenResponse;
  //   const events = calScreenResponse.events;
  //   const refreshInterval = calScreenResponse.refreshInterval;
  //   if (refreshInterval > 0) {
  //     setTimeout(async () => {
  //       const events = await refreshCalendar();
  //       calendarApi?.removeAllEvents();
  //       calendarApi?.addEventSource(events);
  //     }, refreshInterval);
  //   }

  //   return events;
  return props.events;
}

function handleEventClick(arg: EventClickArg) {
  alert(arg);
  console.log(arg);
}

onMounted(() => {
  // Update time
  setInterval(() => {
    currentTime.value = moment().format('h:mm A');
  }, 1000);

  if (calendar.value) {
    calendarApi = calendar.value.getApi();
  }
});

/**
 *
 * @param title
 */
function getPersonCssClasses(title: string, sourceId: string): string {
  const classes: string[] = [];
  console.log(sourceId);
  if (title.indexOf('Girls') >= 0) {
    classes.push('bg-rose-100');
  }
  if (title.indexOf('Linley') >= 0) {
    classes.push('bg-lime-100');
  }
  if (title.indexOf('Elsie') >= 0) {
    classes.push('bg-violet-100');
  }
  if (title.indexOf('Myers') >= 0) {
    classes.push('bg-sky-100');
  }
  if (title.indexOf('Jayne') >= 0) {
    classes.push('bg-amber-100');
  }
  if (title.indexOf('Pete') >= 0) {
    classes.push('bg-teal-100');
  }
  if (sourceId === 'mealviewer') {
    classes.push('bg-green-100');
  }

  if (classes.length === 0) {
    return 'bg-zinc-100';
  }

  // If more than one class, then we gradient it
  // if (classes.length > 1) {
  //   classes[0] = classes[0].replace('bg', 'from');
  //   for (let i = 1; i < classes.length; i++) {
  //     classes[i] = classes[i].replace('bg', 'to');
  //   }
  //   classes.unshift('bg-gradient-to-r');
  // }

  return classes[0];
}

function goBack() {
  router.back();
}
function goPrev() {
  calendarApi?.prev();
  currentlyShownDate.value = moment(calendarApi?.getDate());
}
function goNext() {
  calendarApi?.next();
  currentlyShownDate.value = moment(calendarApi?.getDate());
}
function goToToday() {
  calendarApi?.today();
  currentlyShownDate.value = moment(calendarApi?.getDate());
}

function setView(type: ViewType) {
  console.log(type);
  viewType = type;
  calendarApi?.changeView(fullCalendarType[viewType]);
}

function toggleSource(sourceId: string) {
  const sources = eventSources.value;
  if (sources.has(sourceId)) {
    sources.delete(sourceId);
  } else {
    sources.add(sourceId);
  }
  console.log(`Event Sources: ${JSON.stringify(eventSources)}`);
  currentEvents = props.events.filter((event) =>
    sources.has(event.sourceId || '')
  );
  calendarApi?.removeAllEvents();
  calendarApi?.addEventSource(currentEvents);
}
</script>

<template>
  <div class="flex flex-row bg-white font-xs w-full">
    <div class="flex flex-col bg-slate-100 w-16">
      <div class="h-16"></div>
      <div
        class="flex flex-col border-t border-b h-16 items-center justify-center bg-white"
      >
        <div>
          <CalendarDaysIcon class="h-8"></CalendarDaysIcon>
        </div>
        <div class="text-[0.5rem]">Calendar</div>
      </div>
    </div>
    <div class="flex flex-col bg-white font-xs w-full">
      <div class="navbar bg-white border-b-1 border-slate-500 p-0">
        <div class="navbar-start font-serif">
          <h1 class="font-semibold px-4">
            {{ currentlyShownDate.format('MMMM y') }}
          </h1>

          <h3 class="text-slate-400 p-4">
            {{ currentTime }}
          </h3>
        </div>
        <div class="navbar-center"></div>
        <div class="navbar-end">
          <div
            class="inline-flex items-center justify-center border border-gray-300 rounded-md bg-white px-4 py-2 text-xs font-medium text-slate-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <ChevronLeftIcon @click="goPrev()" class="h-4 w- text-slate-800" />
            <button class="px-8" @click="goToToday()">Today</button>
            <ChevronRightIcon @click="goNext()" class="h-4 w- text-slate-800" />
          </div>

          <div class="">
            <Menu as="div" class="relative inline-block text-left px-4">
              <div>
                <MenuButton
                  class="inline-flex w-full justify-center border border-gray-300 rounded-md bg-white px-4 py-2 text-xs text-slate-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  {{ viewType }}
                  <ChevronDownIcon
                    class="ml-2 -mr-1 h-5 w-5 text-slate-800 hover:text-violet-100"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="px-0 py-1">
                    <MenuItem
                      v-slot="{ active }"
                      v-for="value of viewTypeDropdownItems"
                      :key="value"
                    >
                      <button
                        @click="setView(value)"
                        :class="[
                          active ? 'bg-slate-100' : 'text-gray-900',
                          'group flex w-full items-center px-8 py-4 text-xs'
                        ]"
                      >
                        {{ value }}
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <div class="p-2 flex flex-row gap-4">
        <button
          @click="toggleSource('hoodfamily')"
          :class="[
            eventSources.has('hoodfamily') ? 'btn-active' : '',
            '          btn btn-outline btn-primary btn-sm'
          ]"
        >
          Hood Family
        </button>
        <button
          :class="[
            eventSources.has('myers_canvas') ? 'btn-active' : '',
            '          btn btn-outline btn-primary btn-sm'
          ]"
          @click="toggleSource('myers_canvas')"
        >
          Myers Canvas
        </button>
        <button
          :class="[
            eventSources.has('mealviewer') ? 'btn-active' : '',
            '          btn btn-outline btn-primary btn-sm'
          ]"
          @click="toggleSource('mealviewer')"
        >
          Summerlake Meals
        </button>
      </div>

      <FullCalendar
        class="calendar"
        ref="calendar"
        :options="scheduleCalendarOptions"
      />
    </div>
  </div>
</template>

<style>
.navbar {
  z-index: 100;
}
.calendar {
  z-index: 0;
}
#calendar-container {
  /* position: fixed;
  top: 4.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1; */
}

/* .fc-daygrid-event-harness {
  @apply shadow-md shadow-red-200;
} */

.day-header .fc-cell-shaded {
  @apply bg-white border-0 !important;
}

.fc-body .fc-row {
  min-height: 145px;
}

.fc-timegrid-event,
.fc-daygrid-event {
  @apply bg-transparent border-0 !important;
}

.event-container {
  @apply pl-2 border-l-8 border-l-red-500;
}

.event-title {
  @apply text-xs;
}

.event-time {
  @apply text-slate-400;
}

/* Increase the time slot height */
.fc-timegrid-slot {
  height: 3em !important;
  border-bottom: 0 !important;
}

.fc-event-main {
  @apply text-xs;
}

/* day of week cells */
.fc-col-header-cell {
  @apply border-b-0 border-slate-100 bg-white !important;
}

/* cells w/ all day events */
.fc-daygrid-day {
  @apply border-slate-100 bg-white h-0  !important;
}

/* Top right empty cell */
.fc-timegrid-axis {
  @apply !important;
}

.fc-scrollgrid {
  @apply border-l-0 !important;
}

.fc-timegrid-slot {
}
/* "All Day" cell */
.fc-timegrid-axis {
  @apply border-0 !important;
}
.fc-timegrid-axis-frame {
  @apply bg-white  text-slate-400 text-xs !important;
}

/* Time cells on the left column */
.fc-timegrid-slot-label {
  @apply bg-white text-xs text-slate-400  align-top !important;
}

/* space between all day and calendar */
.fc-timegrid-divider {
  @apply bg-white h-0 !important;
}

.fc-timegrid-col {
  @apply border-slate-200 bg-white  !important;
}

.fc-timegrid-col.fc-day-today {
  @apply bg-sky-50  !important;
}

/* .fc-timegrid-col-frame {
  @apply border-0 !important;
} */
</style>
