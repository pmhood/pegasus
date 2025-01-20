export interface CalendarPluginSettings {
  sources: CalendarSource[];
}

interface CalendarSource {
  id: string;
  url: string;
  type: CalendarSourceType;
  cacheTtl: number;
}

export enum CalendarSourceType {
  Ical = 'ical',
  Json = 'json',
  Mealviewer = 'mealviewer'
}
