import type { FullCalendarEvent } from './full-calendar-event';
import type { RssItem } from './rss-item';

export interface HomeScreenResponse {
  refreshInterval: number;
  layout: LayoutType;
  widgets: OneLeftThreeRightLayout;
  version: string;
}

export interface HomeScreenWidget {
  componentName: string;
  data:
    | CalendarWidgetData
    | PhotoOfTheDayWidgetData
    | ForYouWidgetData
    | RssWidgetData;
}

export interface CalendarWidgetData {
  events: BucketedEvents;
}

export interface BucketedEvents {
  [date: string]: FullCalendarEvent[];
}

export interface PhotoOfTheDayWidgetData {
  photo?: Photo;
}

export interface ForYouWidgetData {
  photo?: Photo;
}

export enum LayoutType {
  OneLeftThreeRight = 'oneLeftThreeRight'
}

export interface OneLeftThreeRightLayout {
  leftWidget?: HomeScreenWidget;
  rightTopWidget?: HomeScreenWidget;
  rightBottomLeftWidget?: HomeScreenWidget;
  rightBottomRightWidget?: HomeScreenWidget;
}

export interface Photo {
  url: string;
  photographer?: string;
  title?: string;
  description?: string;
  location?: string;
}

export interface RssWidgetData {
  rssItem?: RssItem[];
}
