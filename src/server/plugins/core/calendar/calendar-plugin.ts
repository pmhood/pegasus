import * as moment from 'moment';
import {
  CalendarPluginSettings,
  CalendarSourceType
} from './calendar-plugin-settings';
import { FullCalendarEvent } from '../../../../common/dto/full-calendar-event';
import { CalendarIcalSource } from './sources/calendar-ical-source';
import { UpcomingEventsWidgetDisplayable } from '../../../widgets/upcoming-events/upcoming-events-widget-displayable';
import { UpcomingEventsWidgetResponseData } from '../../../widgets/upcoming-events/upcoming-events-widget-response-data';
import { CacheService } from '../../../cache/cache-service';
import { CalendarSource } from './calendar-source';
import { BucketedEvents } from '../../../../common/dto/home-screen-response';
import { CalendarWidgetDisplayable } from '../../../widgets/calendar/calendar-widget-displayable';
import { CalendarWidgetResponseData } from '../../../widgets/calendar/calendar-widget-response-data';

export class CalendarPlugin
  implements UpcomingEventsWidgetDisplayable, CalendarWidgetDisplayable
{
  public static id = 'core/calendar';

  private readonly cacheKeyPrefix: string;
  private readonly sources: { [key: string]: CalendarSource };

  constructor(
    private readonly settings: CalendarPluginSettings,
    private readonly cacheService: CacheService
  ) {
    this.cacheKeyPrefix = `${CalendarPlugin.id}-`;
    this.sources = {
      [CalendarSourceType.Ical]: new CalendarIcalSource()
    };
  }

  public async getCalendarWidgetResponseData(): Promise<
    CalendarWidgetResponseData | undefined
  > {
    const events = await this.fetchEventsForSources();
    if (!events) {
      console.warn(`No events found: ${JSON.stringify(this.settings)}`);
      return;
    }

    return {
      calendarEvents: events
    } as CalendarWidgetResponseData;
  }

  // TODO: I don't like how the plugin now needs to know about widgets... maybe the widget should be transforming the plugin data?
  public async getUpcomingEventsWidgetResponseData(): Promise<
    UpcomingEventsWidgetResponseData | undefined
  > {
    const events = await this.fetchEventsForSources();
    if (!events) {
      console.warn(`No events found: ${JSON.stringify(this.settings)}`);
      return;
    }

    return {
      events: this.bucketEvents(events)
    } as UpcomingEventsWidgetResponseData;
  }

  private async fetchEventsForSources(): Promise<FullCalendarEvent[]> {
    const allEvents: FullCalendarEvent[] = [];

    for (const source of this.settings.sources) {
      const cacheKey = `${this.cacheKeyPrefix}${source.id}`;
      let events = await this.cacheService.get(cacheKey);
      if (!events) {
        console.log(`No cache found for: ${cacheKey}`);
        events = await this.sources[source.type]?.getEvents(
          source.id,
          source.url
        );
        // TODO: Disable cache for cal events for now
        // await this.cacheService.set(cacheKey, events);
      }

      allEvents.push(...events);
    }

    return allEvents;
  }

  private bucketEvents(events: FullCalendarEvent[]): BucketedEvents {
    const today = moment().startOf('d');

    const todayEvents = events.filter((event) => {
      const start = moment(event.start).startOf('d');
      const dayDiff = start.diff(today, 'days');

      // Return today and tomorrow
      return dayDiff >= 0 && dayDiff < 2;
    });

    const sortedEvents = todayEvents.sort((a, b) => {
      if (moment(a.start).isBefore(moment(b.start), 'minute')) {
        return -1;
      } else if (moment(a.start).isAfter(moment(b.start), 'minute')) {
        return 1;
      } else {
        if (moment(a.end).isBefore(moment(b.end), 'minute')) {
          return -1;
        } else if (moment(a.end).isAfter(moment(b.end), 'minute')) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    const bucketedEvents = sortedEvents.reduce((acc, currentValue) => {
      const key = moment(currentValue.start).format('YYYY-MM-DD');
      let bucket = acc[key];
      if (!bucket) {
        bucket = [];
        acc[key] = bucket;
      }
      bucket.push(currentValue);
      return acc;
    }, {} as BucketedEvents);

    return bucketedEvents;
  }
}
