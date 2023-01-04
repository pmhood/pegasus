import { PluginData } from '../../plugins/plugin-factory';

export interface CalendarWidgetSettings {
  plugin: PluginData;
  calendarColors: { [sourceId: string]: string };
}

// interface CalendarColor {
//   id: string;
//   color: string;
// }
