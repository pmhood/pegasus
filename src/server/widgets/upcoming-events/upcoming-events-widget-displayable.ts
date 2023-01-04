import { UpcomingEventsWidgetResponseData } from './upcoming-events-widget-response-data';

export interface UpcomingEventsWidgetDisplayable {
  getUpcomingEventsWidgetResponseData(): Promise<
    UpcomingEventsWidgetResponseData | undefined
  >;
}

export function isUpcomingEventsWidgetDisplayable(
  object: any
): object is UpcomingEventsWidgetDisplayable {
  if (!object) {
    return false;
  }
  return 'getUpcomingEventsWidgetResponseData' in object;
}
