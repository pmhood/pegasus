import { FullCalendarEvent } from '../../../../common/dto/full-calendar-event';

export interface CalendarSource {
  getEvents(sourceId: string, url: string): Promise<FullCalendarEvent[]>;
}
