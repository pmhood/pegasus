import { PluginLocator } from '../plugins/plugin-locator';
import { CalendarPlugin } from '../plugins/core/calendar/calendar-plugin';
import { FullCalendarEvent } from '../plugins/core/calendar/dtos/full-calendar-event';

export class CalendarController {
  public async getData(): Promise<CalendarScreenResponse | undefined> {
    const plugin = PluginLocator.get(CalendarPlugin.id) as CalendarPlugin;
    if (!plugin) {
      return;
    }

    const events = await plugin.fetchAllEvents();

    return { events };
  }
}

export interface CalendarScreenResponse {
  events: FullCalendarEvent[];
}
