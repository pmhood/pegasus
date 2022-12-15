import { Config } from '../config/config';
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
    const config = (await this.configService.getConfig()) as Config | undefined;
    if (!config) {
      throw new Error('No config data found');
    }
    const homeScreen = config.screens.home;

    const widgets: HomeScreenWidget[] = [];

    for (const widgetConfig of homeScreen.widgetConfigs) {
      switch (widgetConfig.id) {
        case WidgetId.PhotoOfTheDay:
          const photos = await this.photosService.getPhoto();
          const photo = randomElement(photos);
          const data: PhotoOfTheDayWidgetData = {
            imageUrl: photo.url,
            description: photo.description,
            photographer: photo.photographer
          };
          const w = {
            id: widgetConfig.id,
            componentName: widgetConfig.componentName,
            data
          } as HomeScreenWidget;

          widgets.push(w);
          break;
        case WidgetId.Calendar:
          // const events = await this.calendarService.getCalendarEvents();
          // widgets.push({
          //   componentName: widgetConfig.componentName,
          //   id: widgetConfig.id,
          //   data: { events } as CalendarWidgetData
          // });
          break;
        case WidgetId.Relevant:
          widgets.push({
            componentName: widgetConfig.componentName,
            id: widgetConfig.id,
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
  Relevant = 'core/relevant',
  Calendar = 'core/calendar',
  PhotoOfTheDay = 'core/photoOfTheDay'
}
