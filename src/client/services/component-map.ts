import MyButton from '@/components/MyButton.vue';
import PhotoOfTheDayWidgetVue from '@/components/widgets/photoOfTheDay/PhotoOfTheDayWidget.vue';
import CalendarWidgetVue from '@/components/widgets/calendar/CalendarWidget.vue';
import ForYouWidget from '@/components/widgets/for-you/ForYouWidget.vue';
import RssWidget from '@/components/widgets/rss/RssWidget.vue';
import MultiLayout from '@/components/layouts/MultiLayout.vue';
import Card from '@/components/widgets/Card.vue';
import UpcomingEventsWidget from '@/components/widgets/upcoming-events/UpcomingEventsWidget.vue';
import SingleLayout from '@/components/layouts/SingleLayout.vue';

export const componentClasses: { [key: string]: any } = {
  // Layouts
  multi: MultiLayout,
  single: SingleLayout,

  // Containers / Widgets
  card: Card,
  upcomingEvents: UpcomingEventsWidget,
  forYou: ForYouWidget,
  calendar: CalendarWidgetVue
  // PhotoOfTheDayWidget: PhotoOfTheDayWidgetVue,
  // CalendarWidget: CalendarWidgetVue,
  // ForYouWidget: ForYouWidget,
  // RssWidget: RssWidget
};

export function componentClassFromString(name: string): any {
  return componentClasses[name];
}
