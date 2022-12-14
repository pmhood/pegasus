// import { LayoutType } from '../../common/dto/home-screen-response';
// import { WidgetId } from '../controllers/home-controller';
import { ScreenData } from '../controllers/screen-controller';
// import { CalendarWidgetSettings } from './calendar-widget-settings';
// import { ForYouWidgetSettings } from './for-you-widget-settings';
// import { PhotoOfTheDayWidgetSettings } from './photo-of-the-day-widget-settings';
// import { RssWidgetSettings } from './rss-widget-settings';

export interface PegasusConfig {
  screens: ScreensConfig;
  // plugins: PluginsConfig;
}

export interface ScreensConfig {
  home: ScreenData;
  calendar: ScreenData;
  // calendar: CalendarScreenConfig;
}

// export interface HomeScreenConfig {
//   refreshInterval: number;
//   layout: LayoutType;
//   widgets: OneLeftThreeRightLayout;
// }

// export interface WidgetConfig {
//   componentName: WidgetId;
//   settings:
//     | CalendarWidgetSettings
//     | ForYouWidgetSettings
//     | PhotoOfTheDayWidgetSettings
//     | RssWidgetSettings;
// }

// export interface PluginsConfig {
//   [pluginKey: string]: any;
// }

// export interface CalendarScreenConfig {
//   refreshInterval: number;
//   sources: CalendarScreenSource[];
// }

// export interface CalendarScreenSource {
//   id: string;
//   color: string;
// }

// interface OneLeftThreeRightLayout {
//   leftWidget: WidgetConfig;
//   rightTopWidget: WidgetConfig;
//   rightBottomLeftWidget: WidgetConfig;
//   rightBottomRightWidget: WidgetConfig;
// }
