import axios from 'axios';
import { FullCalendarEvent } from '../../../../../common/dto/full-calendar-event';

export class CalendarJsonSource {
  public static async getEvents(
    sourceId: string,
    url: string
  ): Promise<FullCalendarEvent[]> {
    const events: FullCalendarEvent[] = [];

    try {
      const response = await axios.get(url);
      const items = response.data.map((item: any) => {
        return { ...item, sourceId };
      });
      events.push(...items);
    } catch (err) {
      console.error(err);
    }

    return events;
  }
}
