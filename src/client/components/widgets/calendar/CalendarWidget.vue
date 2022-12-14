<script setup lang="ts">
// import '@fullcalendar/core/vdom'; // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import iCalendarPlugin from '@fullcalendar/icalendar';
import interactionPlugin from '@fullcalendar/interaction';
import type { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { onMounted, ref } from 'vue';
import type { CalendarApi, EventContentArg } from '@fullcalendar/core';
import axios from 'axios';
import moment from 'moment';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/solid';
import { BackwardIcon, ForwardIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import router from '@/router';
import type { CalendarScreenResponse } from 'src/common/dto/calendar-screen-response';
import type { FullCalendarEvent } from 'src/common/dto/full-calendar-event';

export interface InternalCalendarWidgetResponseData {
  componentName: string;
  events: FullCalendarEvent[];
}

enum ViewType {
  Schedule = 'Schedule view',
  Day = 'Day view',
  Week = 'Week view',
  Month = 'Month view'
}

const props = defineProps<InternalCalendarWidgetResponseData>();

const calendar = ref<any>(null);
let calendarApi: CalendarApi | undefined = undefined;

const currentlyShownDate = ref(moment());
const currentTime = ref(moment().format('h:mm a'));

const scheduleCalendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin],
  allDayContent: '',
  nowIndicator: true,
  initialDate: new Date(),
  showNonCurrentDates: false,
  initialView: 'timeGridFourDay',
  views: {
    timeGridFourDay: {
      type: 'timeGrid',
      duration: { days: 5 }
    }
  },
  scrollTime: moment().subtract(1, 'h').format('HH:MM:00'),
  height: '100%',
  events: props.events,
  eventTimeFormat: {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: 'short'
  },

  headerToolbar: false,
  dayHeaderContent: (arg) => {
    const dayOfWeek = moment(arg.date).format('ddd');
    const dayNumber = moment(arg.date).format('D');

    const div = document.createElement('div');
    div.className = 'py-3 font-normal text-slate-500 text-sm';
    div.innerHTML = `<span class=''>${dayOfWeek}</span>`;

    if (moment(arg.date).isSame(moment(), 'd')) {
      div.innerHTML += ` <span class='font-semibold rounded-full text-white bg-blue-600 px-2 py-2'>${dayNumber}</span>`;
    } else {
      div.innerHTML += ` <span class='text-slate-900 font-semibold'>${dayNumber}</span>`;
    }

    return { domNodes: [div] };
  },
  slotLabelContent: (arg) => {
    return moment(arg.date).format('h a');
  },
  eventContent: (arg: EventContentArg) => {
    const sourceColor = arg.event.extendedProps.sourceColor;
    const div = document.createElement('div');
    const bgColor = arg.event.allDay
      ? `${sourceColor}-300`
      : `${sourceColor}-100`;
    div.className = `bg-${bgColor} h-full border-l-8 border-l-${sourceColor}-400 p-2 rounded-lg text-${sourceColor}-900`;
    div.innerHTML = `<span>${arg.event.title}</span><br/><span>${arg.timeText}</span>`;

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

// const monthCalendarOptions: CalendarOptions = {
//   plugins: [dayGridPlugin, timeGridPlugin],
//   allDayContent: '',
//   nowIndicator: true,
//   initialDate: new Date(),
//   showNonCurrentDates: false,
//   initialView: 'month',
//   scrollTime: moment().subtract(1, 'h').format('HH:MM:00'),
//   height: '100%',
//   events,
//   eventTimeFormat: {
//     hour: 'numeric',
//     minute: '2-digit',
//     meridiem: 'short'
//   },

//   headerToolbar: false,
//   slotLabelContent: (arg) => {
//     return moment(arg.date).format('h a');
//   },
//   eventContent: (arg: EventContentArg) => {
//     // console.log(arg);

//     const div = document.createElement('div');
//     div.className = 'event-container';
//     div.innerHTML = `<span class='event-title'>${arg.event.title}</span><br/><span class='event-time'>${arg.timeText}</span>`;

//     return { domNodes: [div] };
//   }
// };

// const calendarOptions: CalendarOptions = {
//   plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, iCalendarPlugin],
//   // initialView: 'timeGridWeek',
//   allDayContent: 'All Day',
//   nowIndicator: true,
//   initialDate: new Date(),
//   showNonCurrentDates: false,
//   initialView: 'timeGridFourDay',
//   views: {
//     timeGridFourDay: {
//       type: 'timeGrid',
//       duration: { days: 5 }
//     }
//   },
//   scrollTime: moment().format('HH:MM:00'),

//   headerToolbar: {
//     left: 'prev,next today',
//     center: 'title',
//     right: 'dayGridMonth,timeGridWeek,timeGridDay'
//   },

//   eventClick: handleEventClick,
//   // showNonCurrentDates: false,
//   // fixedWeekCount: false,
//   // dayMaxEvents: true,
//   height: '100%',
//   // eventSources: [
//   //   {
//   //     id: 'demoId',
//   //     url: 'https://fullcalendar.io/api/demo-feeds/events.json',
//   //     backgroundColor: 'blue',
//   //     borderColor: 'blue',
//   //     className: 'ev-display2'
//   //   },
//   //   {
//   //     id: 'hood',
//   //     url: '/api/ical',
//   //     format: 'ics',
//   //     backgroundColor: 'red',
//   //     borderColor: 'green',
//   //     className: 'ev-display'
//   //   }
//   // ],

//   events,

//   // events: {
//   //   url: '/api/ical',
//   //   format: 'ics'
//   // },
//   // eventColor: 'rgb(255,0,0)',
//   // eventBackgroundColor: 'rgb(0,255,0)',
//   // eventBorderColor: 'rgb(0,0,255)',
//   eventTimeFormat: {
//     hour: 'numeric',
//     minute: '2-digit',
//     meridiem: 'short'
//   },
//   // eventClassNames: 'ev-display',
//   eventContent: (arg: EventContentArg) => {
//     console.log(arg);

//     const div = document.createElement('div');
//     div.className = 'event-container';
//     div.innerHTML = `<span class='event-title'>${arg.event.title}</span><br/><span class='event-time'>${arg.timeText}</span>`;

//     return { domNodes: [div] };
//   }
// };
// }) //function (arg) {
//     console.log(arg);
//     let italicEl = document.createElement('i');

//     if (arg.event.extendedProps.isUrgent) {
//       italicEl.innerHTML = 'urgent event';
//     } else {
//       italicEl.innerHTML = 'normal event';
//     }

//     let arrayOfDomNodes = [italicEl];
//     return { domNodes: arrayOfDomNodes };
//   }
// };

function handleEventClick(arg: EventClickArg) {
  alert(arg);
  console.log(arg);
}

onMounted(() => {
  // Update time
  setInterval(() => {
    currentTime.value = moment().format('h:mm a');
  }, 1000);

  if (calendar.value) {
    calendarApi = calendar.value.getApi();
  }
});

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

const viewType = ref<ViewType>(ViewType.Schedule);
function setView(type: ViewType) {
  viewType.value = type;
  // switch (type) {
  //   case ViewType.Schedule:
  //     calendarApi?.setOption();
  // }
}
</script>

<template>
  <div class="flex flex-col w-full bg-white">
    <div class="navbar bg-slate-100 border-b-1 border-slate-500">
      <div class="navbar-start divide-x-2 divde-black">
        <button class="px-4" @click="goBack()">
          <ChevronLeftIcon class="h-6 w-6 text-slate-800" />
        </button>

        <h3 class="font-semibold px-4">
          {{ currentlyShownDate.format('MMMM y') }}
        </h3>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end divide-x-2">
        <div
          class="inline-flex items-center justify-center border border-gray-300 rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <ChevronLeftIcon @click="goPrev()" class="h-4 w- text-slate-800" />
          <button class="px-8" @click="goToToday()">Today</button>
          <ChevronRightIcon @click="goNext()" class="h-4 w- text-slate-800" />
        </div>

        <div class="">
          <Menu as="div" class="relative inline-block text-left px-4">
            <div>
              <MenuButton
                class="inline-flex w-full justify-center border border-gray-300 rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                {{ viewType }}
                <ChevronDownIcon
                  class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
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
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="setView(ViewType.Schedule)"
                      :class="[
                        active ? 'bg-slate-100' : 'text-gray-900',
                        'group flex w-full items-center px-8 py-4 text-sm'
                      ]"
                    >
                      {{ ViewType.Schedule }}
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="setView(ViewType.Day)"
                      :class="[
                        active ? 'bg-slate-100' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-8 py-4 text-sm'
                      ]"
                    >
                      {{ ViewType.Day }}
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="setView(ViewType.Week)"
                      :class="[
                        active ? 'bg-slate-100' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-8 py-4 text-sm'
                      ]"
                    >
                      {{ ViewType.Week }}
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="setView(ViewType.Month)"
                      :class="[
                        active ? 'bg-slate-100' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-8 py-4 text-sm'
                      ]"
                    >
                      {{ ViewType.Month }}
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <h4 class="text-slate-600 p-4">
          {{ currentTime }}
        </h4>
      </div>
    </div>
    <!-- <div id="calendar-container"> -->
    <FullCalendar
      class="calendar"
      ref="calendar"
      :options="scheduleCalendarOptions"
    />
    <!-- </div> -->
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

.fc-timegrid-event,
.fc-daygrid-event {
  @apply bg-transparent border-0 !important;
}

.event-container {
  @apply pl-2 border-l-8 border-l-red-500;
}

.event-title {
}

.event-time {
  @apply text-slate-400;
}

/* Increase the time slot height */
.fc-timegrid-slot {
  height: 3em !important;
  border-bottom: 0 !important;
}

/* day of week cells */
.fc-col-header-cell {
  @apply border-b-0 border-slate-100 bg-white !important;
}

/* cells w/ all day events */
.fc-daygrid-day {
  @apply border-slate-100 bg-white !important;
}

/* Top right empty cell */
.fc-timegrid-axis {
  @apply border-0 bg-white !important;
}

/* "All Day" cell */
.fc-timegrid-axis-frame {
  @apply border-0 bg-white text-slate-400 text-sm !important;
}

/* Time cells on the left column */
.fc-timegrid-slot-label {
  @apply bg-white text-xs text-slate-400 border-0 align-top !important;
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
