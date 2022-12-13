<script setup lang="ts">
import { amOrPm, convertHoursTo12h, padMinutes } from '@/utils/date-utils';
import Calendar, { type EventObject } from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import type { ViewType } from '@toast-ui/calendar/types/types/options';
import axios from 'axios';
import { onMounted } from 'vue';
import moment from 'moment';

const calendarResponse = await axios.get('/api/screens/calendar');
const events = calendarResponse.data.events;
let schedules = events.map((event: any) => {
  // {
  //   id: 1,
  //   calendarId: '1',
  //   title: 'A schedule',
  //   category: 'time',
  //   dueDateClass: '',
  //   start: yesterday,
  //   end: today
  // },
  const start = new Date(event.start);
  const end = new Date(event.end);
  // end.setMinutes(end.getMinutes() + 30);
  const eventObj = {
    id: event.uid,
    calendarId: '1', //String(((Math.random() * 10) % 5) + 1),
    title: event.title,
    body: event.description,
    start,
    isAllday: event.dateType === 'date'
  } as EventObject;
  if (!eventObj.isAllday) {
    eventObj.end = end;
  }
  return eventObj;
});

console.log(schedules);

let today = new Date();
let yesterday = new Date(today);
let nesterday = new Date(today);
let chesterday = new Date(today);
let festerday = new Date(today);
yesterday.setDate(today.getDate() + 1);
nesterday.setDate(yesterday.getDate() + 5);
chesterday.setDate(yesterday.getDate() - 13);
festerday.setDate(yesterday.getDate() - 15);

var MOCK_CALENDARS = [
  {
    id: '1',
    name: 'My Calendar',
    color: 'rgb(51 65 85)',
    borderColor: 'red',
    backgroundColor: 'rgb(254 202 202)',
    dragBackgroundColor: '#9e5fff'
  },
  {
    id: '2',
    name: 'Work',
    color: '#ffffff',
    borderColor: '#00a9ff',
    backgroundColor: '#00a9ff',
    dragBackgroundColor: '#00a9ff'
  },
  {
    id: '3',
    name: 'Family',
    color: '#ffffff',
    borderColor: '#DB473F',
    backgroundColor: '#DB473F',
    dragBackgroundColor: '#DB473F'
  },
  {
    id: '4',
    name: 'Friends',
    color: '#ffffff',
    borderColor: '#03bd9e',
    backgroundColor: '#03bd9e',
    dragBackgroundColor: '#03bd9e'
  },
  {
    id: '5',
    name: 'Travel',
    color: '#ffffff',
    borderColor: '#bbdc00',
    backgroundColor: '#bbdc00',
    dragBackgroundColor: '#bbdc00'
  }
];

// let schedules = [
//   {
//     id: 1,
//     calendarId: '1',
//     title: 'A schedule',
//     category: 'time',
//     dueDateClass: '',
//     start: yesterday,
//     end: today
//   },
//   {
//     id: 2,
//     calendarId: '1',
//     title: 'A schedule',
//     category: 'time',
//     dueDateClass: '',
//     start: yesterday,
//     end: nesterday
//   },
//   {
//     id: 3,
//     calendarId: '1',
//     title: 'A schedule',
//     category: 'time',
//     dueDateClass: '',
//     start: chesterday,
//     end: festerday
//   }
// ];

let calendar: Calendar;
// let
onMounted(() => {
  console.log('cal on mounted');
  calendar = new Calendar('#calendar', {
    defaultView: 'week',
    calendars: MOCK_CALENDARS,
    useDetailPopup: true,
    useFormPopup: true,
    usageStatistics: false,
    week: {
      taskView: false,
      showNowIndicator: true
    },
    template: {
      time(event: EventObject) {
        let result = event.title;
        if (!event.isAllday) {
          const startTime = `${convertHoursTo12h(
            event.start.getHours()
          )}:${padMinutes(String(event.start.getMinutes()))}`;
          const endTime = `${convertHoursTo12h(
            event.end.getHours()
          )}:${padMinutes(String(event.end.getMinutes()))}`;
          const time = `${startTime} - ${endTime} ${amOrPm(
            event.start.getHours()
          )}`;
          console.log(event.start.d.getTime());
          const min = moment(event.end.getTime()).diff(
            event.start.getTime(),
            'minutes'
          );

          result = `<span class='text-gray-900'>${result}</span>`;
          if (Math.abs(min) > 30) {
            result += `<br/><span class='text-gray-500'>${time}</span>`;
          }
        }
        return result;
      }
    },
    theme: {
      week: {
        dayGrid: {
          borderRight: 'none'
        }
      }
    }
  });
  calendar.createEvents(schedules);
});

// var cal = new Calendar('#calendar', {
//   defaultView: 'month',
//   calendars: MOCK_CALENDARS
// });

function switchView(viewType: ViewType) {
  calendar.changeView(viewType);
  calendar.setOptions({
    month: {
      visibleWeeksCount: undefined
    }
  });
}
function switchToTwoWeeks() {
  calendar.changeView('month');
  calendar.setOptions({
    month: {
      visibleWeeksCount: 2
    }
  });
  // const options = calendar.getOptions();
  // options.month.visibleWeeksCount = 2;
  // cale
}
function switchToSchedule() {
  calendar.setOptions({
    week: {}
  });
}
function goToToday() {
  calendar.today();
}
function next() {
  calendar.next();
}
function prev() {
  calendar.prev();
}
</script>

<template>
  <div>
    <h1>Calendar</h1>
    <div>
      <a @click="switchView('month')">Monthly</a>
      <a @click="switchToTwoWeeks()">2 Weeks</a>
      <a @click="switchView('week')">Weekly</a>
      <a @click="switchToSchedule()">Schedule</a>
      <a @click="switchView('day')">Daily</a>
      <a @click="goToToday()">Today</a>
    </div>
    <div><a @click="prev()">Prev</a><a @click="next()">Next</a></div>
    <div id="calendar" style="height: 800px"></div>
  </div>
</template>
