import { CalendarWidget } from './calendar/calendar-widget';
import { CardWidget } from './containers/card-widget/card-widget';
import { CarouselWidget } from './containers/carousel-widget/carousel-widget';
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
      case CalendarWidget.id:
        return new CalendarWidget(widgetData.settings);
      case CarouselWidget.id:
        return new CarouselWidget(widgetData.settings);
    }

    console.error(`Cannot find widget: ${widgetData.widgetId}`);
  }
}

export interface WidgetData {
  widgetId: string;
  settings: any;
}
