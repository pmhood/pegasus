import { FullCalendarEvent } from './full-calendar-event';

export interface CalendarScreenResponse {
  events: FullCalendarEvent[];
  refreshInterval: number;
}
