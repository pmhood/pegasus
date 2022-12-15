import {
  CalendarPluginSettings,
  CalendarSourceType
} from './calendar-plugin-settings';
import { FullCalendarEvent } from './dtos/full-calendar-event';
import { CalendarIcalSource } from './sources/calendar-ical-source';
import { CalendarJsonSource } from './sources/calendar-json-source';

export class CalendarPlugin {
  public static id = 'core/calendar';
  private readonly calendarService: CalendarIcalSource;

  // TODO: cache events

  constructor(private readonly settings: CalendarPluginSettings) {
    this.calendarService = new CalendarIcalSource();
  }

  public async fetchAllEvents(): Promise<FullCalendarEvent[]> {
    // TODO: maybe make this all part of a base class that indexes into a map of classes by type?
    const allEvents: FullCalendarEvent[] = [];
    for (const source of this.settings.sources) {
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
