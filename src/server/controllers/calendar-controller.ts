import { PluginLocator } from '../plugins/plugin-locator';
import { CalendarPlugin } from '../plugins/core/calendar/calendar-plugin';
import { FullCalendarEvent } from '../plugins/core/calendar/dtos/full-calendar-event';
import { ConfigService } from '../config/config-service';

export class CalendarController {
  constructor(private readonly configService: ConfigService) {}

  public async getData(): Promise<CalendarScreenResponse | undefined> {
    const plugin = PluginLocator.get(CalendarPlugin.id) as CalendarPlugin;
    if (!plugin) {
      return;
    }

    const sources = (await this.configService.getConfig()).screens.calendar
      .sources;
    const events = await plugin.fetchEventsForSources(
      sources.map((item) => item.id)
    );
    const eventsWithColor = events.map((item) => {
      const source = sources.find((s) => s.id === item.sourceId);
      if (source) {
        item.sourceColor = source.color;
      }
      return item;
    });

    return { events: eventsWithColor };
  }
}

export interface CalendarScreenResponse {
  events: FullCalendarEvent[];
}
