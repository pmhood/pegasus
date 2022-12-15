import * as ical from 'node-ical';
import { FullCalendarEvent } from '../dtos/full-calendar-event';

export class CalendarIcalSource {
  public static async getEvents(
    sourceId: string,
    url: string
  ): Promise<FullCalendarEvent[]> {
    const events: FullCalendarEvent[] = [];

    try {
      const icalEvents = await ical.async.fromURL(url);
      for (const event of Object.values(icalEvents)) {
        if (event.type === 'VEVENT') {
          const item = {
            id: event.uid,
            title: event.summary,
            description: event.description,
            start: event.start.toISOString(),
            end: event.end.toISOString(),
            allDay: event.datetype === 'date',
            sourceId
          } as FullCalendarEvent;

          events.push(item);
        }
      }
    } catch (err) {
      console.error(err);
    }

    return events;
  }
}
