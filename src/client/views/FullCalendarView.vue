<script setup lang="ts">
import '@fullcalendar/core/vdom'; // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import iCalendarPlugin from '@fullcalendar/icalendar';
import interactionPlugin from '@fullcalendar/interaction';
import type { CalendarOptions, EventClickArg } from '@fullcalendar/common';
import { onMounted } from 'vue';
import type { EventContentArg } from '@fullcalendar/core';
import axios from 'axios';
import moment from 'moment';

const calendarResponse = await axios.get('/api/screens/calendar');
const events = calendarResponse.data.events;

const scheduleCalendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin],
  allDayContent: 'All Day',
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
  scrollTime: moment().format('HH:MM:00'),
  height: '100%',
  events,
  eventTimeFormat: {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: 'short'
  },
  eventContent: (arg: EventContentArg) => {
    console.log(arg);

    const div = document.createElement('div');
    div.className = 'event-container';
    div.innerHTML = `<span class='event-title'>${arg.event.title}</span><br/><span class='event-time'>${arg.timeText}</span>`;

    return { domNodes: [div] };
  }
};

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
  // calendar.setOption('height', 700);
});

// export default {
//   components: {
//     FullCalendar // make the <FullCalendar> tag available
//   },
//   data() {
//     return {
//       calendarOptions: {
//         plugins: [dayGridPlugin, interactionPlugin],
//         initialView: 'dayGridMonth'
//       }
//     };
//   }
// };
</script>
<template>
  <div id="calendar-container">
    <FullCalendar :options="scheduleCalendarOptions" />
  </div>
</template>

<style>
#calendar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.ev-display {
  /* @apply border-l-8 border-l-red-500 drop-shadow-xl hover:bg-blue-500; */
  @apply bg-green-100;
}
.ev-display2 {
  /* @apply border-l-8 border-l-red-500 drop-shadow-xl hover:bg-blue-500; */
  @apply bg-blue-100;
}

/* .fc-daygrid-event-harness {
  @apply shadow-md shadow-red-200;
} */

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
</style>
