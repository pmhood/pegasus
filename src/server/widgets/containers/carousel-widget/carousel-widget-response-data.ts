import { CardWidgetResponseData } from '../card-widget/card-widget-response-data';

export interface CarouselWidgetResponseData {
  componentName: string;
  transitionType: string;
  transitionTime: number;
  items: CardWidgetResponseData[];
}
