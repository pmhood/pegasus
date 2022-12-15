// https://fullcalendar.io/docs/event-parsing
export interface FullCalendarEvent {
  id?: string;
  groupId?: string;
  allDay?: boolean;
  start?: string;
  end?: string;
  daysOfWeek?: number[];
  startTime?: string;
  endTime?: string;
  startRecur?: string;
  endRecur?: string;
  title?: string;
  url?: string;
  interactive?: boolean;
  classNames?: string[];
  display?: string;
  extendedProps?: any;
  description?: string;
  sourceId?: string;
}
