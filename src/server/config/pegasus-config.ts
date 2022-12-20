import { WidgetId } from '../controllers/home-controller';

export interface PegasusConfig {
  screens: ScreensConfig;
  plugins: PluginsConfig;
}

export interface ScreensConfig {
  home: HomeScreenConfig;
  calendar: CalendarScreenConfig;
}

export interface HomeScreenConfig {
  refreshInterval: number;
  widgetConfigs: WidgetConfig[];
}

export interface WidgetConfig {
  componentName: WidgetId;
  settings: CalendarWidgetConfig;
}

export interface CalendarWidgetConfig extends WidgetConfig {
  dataSources: GmailCalenderWidgetConfig;
}

export interface GmailCalenderWidgetConfig {}

export interface PluginsConfig {
  [pluginKey: string]: any;
}

export interface CalendarScreenConfig {
  refreshInterval: number;
  sources: CalendarScreenSource[];
}

export interface CalendarScreenSource {
  id: string;
  color: string;
}
