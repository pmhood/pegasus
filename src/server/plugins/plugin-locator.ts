import { CalendarPlugin } from './core/calendar/calendar-plugin';

export class PluginLocator {
  private static plugins: any = {};

  public static add(id: string, settings: any) {
    switch (id) {
      case 'core/calendar':
        PluginLocator.plugins[id] = new CalendarPlugin(settings);
    }
  }

  public static get(id: string): any | undefined {
    return PluginLocator.plugins[id];
  }
}
