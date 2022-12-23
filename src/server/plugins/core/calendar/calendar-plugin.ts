import {
  CalendarPluginSettings,
  CalendarSourceType
} from './calendar-plugin-settings';
import { FullCalendarEvent } from './dtos/full-calendar-event';
import { CalendarIcalSource } from './sources/calendar-ical-source';
import { CalendarJsonSource } from './sources/calendar-json-source';

export class CalendarPlugin {
  public static id = 'core/calendar';
  // private readonly calendarService: CalendarIcalSource;

  // TODO: cache events

  constructor(private readonly settings: CalendarPluginSettings) {
    // this.calendarService = new CalendarIcalSource();
  }

  public async fetchEventsForSources(
    sourceIds: string[]
  ): Promise<FullCalendarEvent[]> {
    const allEvents: FullCalendarEvent[] = [];

    for (const sourceId of sourceIds) {
      const source = this.settings.sources.find((item) => item.id === sourceId);
      if (!source) {
        continue;
      }

      if (source.type === CalendarSourceType.Ical) {
        const events = await CalendarIcalSource.getEvents(
          source.id,
          source.url
        );
        allEvents.push(...events);
      } else if (source.type === CalendarSourceType.Json) {
        const events = await CalendarJsonSource.getEvents(
          source.id,
          source.url
        );
        allEvents.push(...events);
      }
    }

    return allEvents;
  }
}
