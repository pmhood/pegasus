import { LayoutType } from '../../common/dto/home-screen-response';
import { WidgetId } from '../controllers/home-controller';
import { ForYouWidgetSettings } from './for-you-widget-settings';
import { PhotoOfTheDayWidgetSettings } from './photo-of-the-day-widget-settings';

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
  layout: LayoutType;
  widgets: OneLeftThreeRightLayout;
}

export interface WidgetConfig {
  componentName: WidgetId;
  settings:
    | CalendarWidgetConfig
    | ForYouWidgetSettings
    | PhotoOfTheDayWidgetSettings;
}

export interface CalendarWidgetConfig {
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

interface OneLeftThreeRightLayout {
  leftWidget: WidgetConfig;
  rightTopWidget: WidgetConfig;
  rightBottomLeftWidget: WidgetConfig;
  rightBottomRightWidget: WidgetConfig;
}
