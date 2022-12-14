// const ICAL = require('ical.js');
import * as ical from 'node-ical';
import { CalendarEvent } from '../../dto/home-response';

export class CalendarService {
  public async getCalendarEvents(): Promise<CalendarEvent[]> {
    // const ics = require('../../mock/basic.ics');

    const events: CalendarEvent[] = [];
    try {
      const webEvents = await ical.async.fromURL(
        'https://calendar.google.com/calendar/ical/db26bfdd34e830ef0e8dbafdd53e079bcf527e238410728924656d2eed2c981b%40group.calendar.google.com/public/basic.ics'
      );

      // loop through events and log them
      for (const event of Object.values(webEvents)) {
        if (event.type === 'VEVENT') {
          // console.log(
          //   'Summary: ' +
          //     event.summary +
          //     '\nDescription: ' +
          //     event.description +
          //     '\nStart Date: ' +
          //     event.start.toISOString() +
          //     '\n'
          // );

          console.log(event);
          events.push({
            uid: event.uid,
            title: event.summary,
            description: event.description,
            start: event.start,
            end: event.end,
            dateType: event.datetype
          } as CalendarEvent);
        }
      }
    } catch (err) {
      console.log(err);
    }

    return events;
  }
}
