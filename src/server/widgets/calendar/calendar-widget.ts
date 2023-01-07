import { PluginFactory } from '../../plugins/plugin-factory';
import { Widget } from '../widget';
import {
  CalendarWidgetDisplayable,
  isCalendarWidgetDisplayable
} from './calendar-widget-displayable';
import { CalendarWidgetResponseData } from './calendar-widget-response-data';
import { CalendarWidgetSettings } from './calendar-widget-settings';

export class CalendarWidget implements Widget {
  public static readonly id = 'calendar';
  private readonly plugin: CalendarWidgetDisplayable | undefined;

  constructor(private readonly settings: CalendarWidgetSettings) {
    const plugin = PluginFactory.make(settings.plugin);
    if (plugin && isCalendarWidgetDisplayable(plugin)) {
      this.plugin = plugin;
    } else {
      console.warn(
        `${settings.plugin.pluginId} is not CalendarWidgetDisplayable`
      );
    }
  }

  public async getResponseData(): Promise<
    CalendarWidgetResponseData | undefined
  > {
    const data = await this.plugin?.getCalendarWidgetResponseData();
    // console.log(`CalendarWidget response: ${JSON.stringify(data)}`);
    if (data) {
      data.componentName = CalendarWidget.id;
      data.events = data.events.map((e) => {
        const color = e.sourceId
          ? this.settings.calendarColors[e.sourceId]
          : 'grey';

        e.sourceColor = color;
        return e;
      });
    }

    return data;
  }
}
