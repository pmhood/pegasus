import { PluginFactory } from '../../plugins/plugin-factory';
import { Widget } from '../widget';
import {
  isUpcomingEventsWidgetDisplayable,
  UpcomingEventsWidgetDisplayable
} from './upcoming-events-widget-displayable';
import { UpcomingEventsWidgetResponseData } from './upcoming-events-widget-response-data';
import { UpcomingEventsWidgetSettings } from './upcoming-events-widget-settings';

export class UpcomingEventsWidget implements Widget {
  public static readonly id = 'upcomingEvents';
  private readonly plugin: UpcomingEventsWidgetDisplayable | undefined;

  constructor(settings: UpcomingEventsWidgetSettings) {
    const plugin = PluginFactory.make(settings.plugin);
    if (plugin && isUpcomingEventsWidgetDisplayable(plugin)) {
      this.plugin = plugin;
    } else {
      console.warn(
        `${settings.plugin.pluginId} is not UpcomingEventsWidgetDisplayable`
      );
    }
  }

  public async getResponseData(): Promise<
    UpcomingEventsWidgetResponseData | undefined
  > {
    const data = await this.plugin?.getUpcomingEventsWidgetResponseData();
    console.log(`CardWidget response: ${JSON.stringify(data)}`);
    if (data) {
      data.componentName = UpcomingEventsWidget.id;
    }
    return data;
  }
}
