import MyButton from '@/components/MyButton.vue';
import PhotoOfTheDayWidgetVue from '@/components/widgets/photoOfTheDay/PhotoOfTheDayWidget.vue';
import CalendarWidgetVue from '@/components/widgets/calendar/CalendarWidget.vue';
import RelevantWidgetVue from '@/components/widgets/relevant/RelevantWidget.vue';

export const componentClasses: { [key: string]: any } = {
  PhotoOfTheDayWidget: PhotoOfTheDayWidgetVue,
  CalendarWidget: CalendarWidgetVue,
  RelevantWidget: RelevantWidgetVue
};

export function componentClassFromString(name: string): any {
  return componentClasses[name];
}
