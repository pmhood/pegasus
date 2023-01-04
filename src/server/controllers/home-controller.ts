// import { WidgetConfig } from '../config/pegasus-config';
// import { Config } from '../config/config-service';
// import {
//   CalendarWidgetData,
//   ForYouWidgetData,
//   HomeScreenResponse,
//   HomeScreenWidget,
//   LayoutType,
//   OneLeftThreeRightLayout,
//   PhotoOfTheDayWidgetData,
//   RssWidgetData
// } from '../../common/dto/home-screen-response';
// import { PhotosService } from '../plugins/core/photos/photos-service';
// import { randomElement } from '../utils/array-utils';
// import {
//   ForYouWidgetSettings,
//   PhotoSource
// } from '../config/for-you-widget-settings';
// import { PhotoOfTheDayWidgetSettings } from '../config/photo-of-the-day-widget-settings';
// import { PluginLocator } from '../plugins/plugin-locator';
// import { CalendarPlugin } from '../plugins/core/calendar/calendar-plugin';
// import { CalendarWidgetSettings } from '../config/calendar-widget-settings';
// import * as moment from 'moment';
// import { RssWidgetSettings } from '../config/rss-widget-settings';
// import { RssPlugin } from '../plugins/core/rss/rss-plugin';

// export class HomeController {
//   private photosService = new PhotosService();

//   public async getData(): Promise<HomeScreenResponse> {
//     const homeScreen = Config.getConfig().screens.home;

//     const response: HomeScreenResponse = {
//       refreshInterval: homeScreen.refreshInterval,
//       layout: homeScreen.layout,
//       widgets: {},
//       version: Config.version
//     };

//     if (homeScreen.layout === LayoutType.OneLeftThreeRight) {
//       const widgetsForLayout: OneLeftThreeRightLayout = {
//         leftWidget: await this.getWidget(homeScreen.widgets.leftWidget),
//         rightTopWidget: await this.getWidget(homeScreen.widgets.rightTopWidget),
//         rightBottomLeftWidget: await this.getWidget(
//           homeScreen.widgets.rightBottomLeftWidget
//         ),
//         rightBottomRightWidget: await this.getWidget(
//           homeScreen.widgets.rightBottomRightWidget
//         )
//       };

//       response.widgets = widgetsForLayout;
//     }

//     return response;
//   }

//   private async getWidget(
//     widgetConfig: WidgetConfig
//   ): Promise<HomeScreenWidget | undefined> {
//     switch (widgetConfig.componentName) {
//       case WidgetId.PhotoOfTheDay:
//         const photoOfTheDayData = await this.getPhotoOfTheDayWidgetData(
//           widgetConfig.settings as PhotoOfTheDayWidgetSettings
//         );

//         return {
//           componentName: widgetConfig.componentName,
//           data: photoOfTheDayData
//         } as HomeScreenWidget;

//       case WidgetId.Calendar:
//         const calendarData = await this.getCalendarData(
//           widgetConfig.settings as CalendarWidgetSettings
//         );

//         return {
//           componentName: widgetConfig.componentName,
//           data: calendarData
//         } as HomeScreenWidget;

//       case WidgetId.ForYou:
//         const forYouData: ForYouWidgetData = {};

//         const settings = widgetConfig.settings as ForYouWidgetSettings;
//         if (settings.photo.source === PhotoSource.Pexels) {
//           const photos = await this.photosService.getPhotosFromCollection(
//             settings.photo.settings.collectionId
//           );
//           forYouData.photo = randomElement(photos);
//         }

//         return {
//           componentName: widgetConfig.componentName,
//           data: forYouData
//         };

//       case WidgetId.Rss:
//         const rssData: RssWidgetData = {};

//         const rssSettings = widgetConfig.settings as RssWidgetSettings;
//         const plugin = PluginLocator.get(RssPlugin.id) as RssPlugin;
//         rssData.rssItem = await plugin.fetchItemsForSources(
//           rssSettings.sources
//         );

//         return {
//           componentName: widgetConfig.componentName,
//           data: rssData
//         };
//     }
//   }

//   private async getPhotoOfTheDayWidgetData(
//     settings: PhotoOfTheDayWidgetSettings
//   ): Promise<PhotoOfTheDayWidgetData> {
//     const data: PhotoOfTheDayWidgetData = {};

//     if (settings.photo.source === PhotoSource.Pexels) {
//       const photos = await this.photosService.getPhotosFromCollection(
//         settings.photo.settings.collectionId
//       );
//       data.photo = randomElement(photos);
//     }

//     return data;
//   }

//   private async getCalendarData(
//     settings: CalendarWidgetSettings
//   ): Promise<CalendarWidgetData> {
//     const plugin = PluginLocator.get(CalendarPlugin.id) as CalendarPlugin;
//     const events = await plugin.fetchEventsForSources(settings.calendars);

//     const today = moment();
//     // TODO: Filter .end > now? - only show events now or in the future within 1 day
//     const todayEvents = events.filter((event) => {
//       const diffDays = moment(event.start).diff(today, 'd');
//       return diffDays >= 0 && diffDays < 2;
//     });

//     const sortedEvents = todayEvents.sort((a, b) => {
//       if (moment(a.start).isBefore(moment(b.start), 'minute')) {
//         return -1;
//       } else if (moment(a.start).isAfter(moment(b.start), 'minute')) {
//         return 1;
//       } else {
//         if (moment(a.end).isBefore(moment(b.end), 'minute')) {
//           return -1;
//         } else if (moment(a.end).isAfter(moment(b.end), 'minute')) {
//           return 1;
//         } else {
//           return 0;
//         }
//       }
//     });

//     const bucketedEvents = sortedEvents.reduce((acc, currentValue) => {
//       const key = moment(currentValue.start).format('YYYY-MM-DD');
//       let bucket = acc[key];
//       if (!bucket) {
//         bucket = [];
//         acc[key] = bucket;
//       }
//       bucket.push(currentValue);

//       return acc;
//     }, {});

//     return {
//       events: bucketedEvents
//     } as CalendarWidgetData;
//   }
// }

// export enum WidgetId {
//   ForYou = 'ForYouWidget',
//   Calendar = 'CalendarWidget',
//   PhotoOfTheDay = 'PhotoOfTheDayWidget',
//   Rss = 'RssWidget'
// }
