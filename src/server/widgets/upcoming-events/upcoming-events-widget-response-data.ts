import { BucketedEvents } from '../../../common/dto/home-screen-response';

export interface UpcomingEventsWidgetResponseData {
  componentName: string;
  events: BucketedEvents;
}
