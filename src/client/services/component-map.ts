import MyButton from '@/components/MyButton.vue';
import PhotoOfTheDayWidgetVue from '@/components/widgets/photoOfTheDay/PhotoOfTheDayWidget.vue';
import CalendarWidgetVue from '@/components/widgets/calendar/CalendarWidget.vue';
import ForYouWidget from '@/components/widgets/for-you/ForYouWidget.vue';
import RssWidget from '@/components/widgets/rss/RssWidget.vue';
import MultiLayout from '@/components/layouts/MultiLayout.vue';
import Card from '@/components/widgets/Card.vue';

export const componentClasses: { [key: string]: any } = {
  multi: MultiLayout,
  card: Card,
  upcomingEvents: CalendarWidgetVue,
  forYou: ForYouWidget,
  PhotoOfTheDayWidget: PhotoOfTheDayWidgetVue,
  CalendarWidget: CalendarWidgetVue,
  ForYouWidget: ForYouWidget,
  RssWidget: RssWidget
};

export function componentClassFromString(name: string): any {
  return componentClasses[name];
}
