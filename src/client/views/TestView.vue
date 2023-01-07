<script setup lang="ts">
import axios from 'axios';
import CalendarWidget from '../components/widgets/calendar/CalendarWidget.vue';

const calendarResponse = await axios.get('/api/screens/calendar');
const calScreenResponse = calendarResponse.data.main;
const events = calScreenResponse.events;
</script>

<template>
  <CalendarWidget :component-name="'calendar'" :events="events" />
</template>
