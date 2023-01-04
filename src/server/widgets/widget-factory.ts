import { CardWidget } from './containers/card-widget/card-widget';
import { ForYouWidget } from './for-you/for-you-widget';
import { UpcomingEventsWidget } from './upcoming-events/upcoming-events-widget';
import { Widget } from './widget';

export class WidgetFactory {
  public static make(widgetData: WidgetData): Widget | undefined {
    switch (widgetData.widgetId) {
      case CardWidget.id:
        return new CardWidget(widgetData.settings);
      case UpcomingEventsWidget.id:
        return new UpcomingEventsWidget(widgetData.settings);
      case ForYouWidget.id:
        return new ForYouWidget();
    }
  }
}

export interface WidgetData {
  widgetId: string;
  settings: any;
}
