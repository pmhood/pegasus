import * as ical from 'node-ical';
import { FullCalendarEvent } from '../../../../../common/dto/full-calendar-event';
import { CalendarSource } from '../calendar-source';

export class CalendarIcalSource implements CalendarSource {
  public async getEvents(
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
