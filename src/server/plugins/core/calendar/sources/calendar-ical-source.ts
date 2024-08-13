import * as ical from 'node-ical';
import { FullCalendarEvent } from '../../../../../common/dto/full-calendar-event';
import { CalendarSource } from '../calendar-source';
import * as moment from 'moment';
// import { rrulestr, RRuleSet } from 'rrule';
// import axios from 'axios';

export class CalendarIcalSource implements CalendarSource {
  public async getEvents(
    sourceId: string,
    url: string
  ): Promise<FullCalendarEvent[]> {
    const events: FullCalendarEvent[] = [];

    try {
      // const response = await axios.get(url);
      const startOfMonth = moment().startOf('month');
      const endOfMonth = moment().add(3, 'M').endOf('month');

      const items = await ical.async.fromURL(url);
      const icalEvents = Object.values(items).filter((event: any) => {
        const startDate = moment(event.start);
        const endDate = moment(event.end);
        const success = startDate >= startOfMonth && endDate <= endOfMonth;
        return (success && event.type === 'VEVENT') || event.rrule;
      }) as any[];

      // console.log(icalEvents);
      for (const event of icalEvents) {
        if (event.rrule) {
          const rule = event.rrule;
          // Generate occurrences of the recurring event
          const dates = rule.between(
            startOfMonth.toDate(),
            endOfMonth.toDate()
          ); // rule.all(); // You can also use rule.between(start, end) to get occurrences between specific dates
          const duration = moment(event.end).diff(
            moment(event.start),
            'minutes'
          );
          dates.forEach((date) => {
            const start = moment(date);
            const end = moment(start).add(duration, 'minutes');
            events.push({
              id: event.uid,
              title: event.summary,
              description: event.description,
              start: start.toISOString(),
              end: end.toISOString(),
              allDay: event.datetype === 'date',
              sourceId
            } as FullCalendarEvent);
          });
        } else {
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
