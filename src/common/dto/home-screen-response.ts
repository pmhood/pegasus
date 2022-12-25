export interface HomeScreenResponse {
  refreshInterval: number;
  layout: LayoutType;
  widgets: OneLeftThreeRightLayout;
  version: string;
}

export interface HomeScreenWidget {
  componentName: string;
  data: CalendarWidgetData | PhotoOfTheDayWidgetData | ForYouWidgetData;
}

export interface CalendarWidgetData {
  events: CalendarEvent[];
}

export interface CalendarEvent {
  title: string;
  description: string;
  start: Date;
  end?: Date;
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
