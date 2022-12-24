import MyButton from '@/components/MyButton.vue';
import PhotoOfTheDayWidgetVue from '@/components/widgets/photoOfTheDay/PhotoOfTheDayWidget.vue';
import CalendarWidgetVue from '@/components/widgets/calendar/CalendarWidget.vue';
import ForYouWidget from '@/components/widgets/for-you/ForYouWidget.vue';

export const componentClasses: { [key: string]: any } = {
  PhotoOfTheDayWidget: PhotoOfTheDayWidgetVue,
  CalendarWidget: CalendarWidgetVue,
  ForYouWidget: ForYouWidget
};

export function componentClassFromString(name: string): any {
  return componentClasses[name];
}
