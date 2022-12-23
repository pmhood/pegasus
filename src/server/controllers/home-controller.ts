import { PegasusConfig } from '../config/pegasus-config';
import { ConfigService } from '../config/config-service';
import {
  CalendarWidgetData,
  HomeScreenResponse,
  HomeScreenWidget,
  PhotoOfTheDayWidgetData,
  RelevantWidgetData
} from '../dto/home-response';
import { PhotosService } from '../plugins/core/photos/photos-service';
import { randomElement } from '../utils/array-utils';

export class HomeController {
  private photosService = new PhotosService();
  constructor(private readonly configService: ConfigService) {}

  public async getData(): Promise<HomeScreenResponse> {
    const config = (await this.configService.getConfig()) as
      | PegasusConfig
      | undefined;
    if (!config) {
      throw new Error('No config data found');
    }
    const homeScreen = config.screens.home;

    const widgets: HomeScreenWidget[] = [];

    for (const widgetConfig of homeScreen.widgetConfigs) {
      switch (widgetConfig.componentName) {
        case WidgetId.PhotoOfTheDay:
          const photos = await this.photosService.getPhoto();
          if (photos.length > 0) {
            const photo = randomElement(photos);
            const data: PhotoOfTheDayWidgetData = {
              imageUrl: photo.url,
              description: photo.description,
              photographer: photo.photographer
            };
            const w = {
              componentName: widgetConfig.componentName,
              data
            } as HomeScreenWidget;

            widgets.push(w);
          }
          break;
        case WidgetId.Calendar:
          // const events = await this.calendarService.getCalendarEvents();
          widgets.push({
            componentName: widgetConfig.componentName,
            data: { events: [] } as CalendarWidgetData
          });
          break;
        case WidgetId.Relevant:
          widgets.push({
            componentName: widgetConfig.componentName,
            data: {} as RelevantWidgetData
          });
          break;
      }
    }
    const response: HomeScreenResponse = {
      refreshInterval: homeScreen.refreshInterval,
      widgets
    };

    return response;
  }
}

export enum WidgetId {
  Relevant = 'RelevantWidget',
  Calendar = 'CalendarWidget',
  PhotoOfTheDay = 'PhotoOfTheDayWidget'
}
