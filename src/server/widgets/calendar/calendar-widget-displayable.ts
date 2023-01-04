import { CalendarWidgetResponseData } from './calendar-widget-response-data';

export interface CalendarWidgetDisplayable {
  getCalendarWidgetResponseData(): Promise<
    CalendarWidgetResponseData | undefined
  >;
}

export function isCalendarWidgetDisplayable(
  object: any
): object is CalendarWidgetDisplayable {
  if (!object) {
    return false;
  }
  return 'getCalendarWidgetResponseData' in object;
}
