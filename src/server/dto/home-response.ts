export interface HomeScreenResponse {
  refreshInterval: number;
  widgets: HomeScreenWidget[];
}

export interface HomeScreenWidget {
  componentName: string;
  data: CalendarWidgetData | PhotoOfTheDayWidgetData | RelevantWidgetData;
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
  imageUrl: string;
  description?: string;
  location?: string;
  photographer?: string;
}

export interface RelevantWidgetData {}
