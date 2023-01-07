import { FullCalendarEvent } from '../../../common/dto/full-calendar-event';

export interface CalendarWidgetResponseData {
  componentName: string;
  events: FullCalendarEvent[];
}
