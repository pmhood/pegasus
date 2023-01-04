import { CardWidgetResponseData } from './card-widget-response-data';

export interface CardWidgetDisplayable {
  getCardWidgetResponseData(): Promise<CardWidgetResponseData | undefined>;
}

export function isCardWidgetDisplayable(
  object: any
): object is CardWidgetDisplayable {
  if (!object) {
    return false;
  }
  return 'getCardWidgetResponseData' in object;
}
