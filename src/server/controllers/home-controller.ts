import { PegasusConfig, WidgetConfig } from '../config/pegasus-config';
import { ConfigService } from '../config/config-service';
import {
  CalendarWidgetData,
  ForYouWidgetData,
  HomeScreenResponse,
  HomeScreenWidget,
  LayoutType,
  OneLeftThreeRightLayout,
  PhotoOfTheDayWidgetData
} from '../../common/dto/home-screen-response';
import { PhotosService } from '../plugins/core/photos/photos-service';
import { randomElement } from '../utils/array-utils';
import {
  ForYouWidgetSettings,
  PhotoSource
} from '../config/for-you-widget-settings';
import { PhotoOfTheDayWidgetSettings } from '../config/photo-of-the-day-widget-settings';

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

    const response: HomeScreenResponse = {
      refreshInterval: homeScreen.refreshInterval,
      layout: homeScreen.layout,
      widgets: {},
      version: this.configService.version
    };

    if (homeScreen.layout === LayoutType.OneLeftThreeRight) {
      const widgetsForLayout: OneLeftThreeRightLayout = {
        leftWidget: await this.getWidget(homeScreen.widgets.leftWidget),
        rightTopWidget: await this.getWidget(homeScreen.widgets.rightTopWidget),
        rightBottomLeftWidget: await this.getWidget(
          homeScreen.widgets.rightBottomLeftWidget
        ),
        rightBottomRightWidget: await this.getWidget(
          homeScreen.widgets.rightBottomRightWidget
        )
      };

      response.widgets = widgetsForLayout;
    }

    return response;
  }

  private async getPhotoOfTheDayWidgetData(
    settings: PhotoOfTheDayWidgetSettings
  ): Promise<PhotoOfTheDayWidgetData> {
    const data: PhotoOfTheDayWidgetData = {};

    if (settings.photo.source === PhotoSource.Pexels) {
      const photos = await this.photosService.getPhotosFromCollection(
        settings.photo.settings.collectionId
      );
      data.photo = randomElement(photos);
    }

    return data;
  }

  private async getWidget(
    widgetConfig: WidgetConfig
  ): Promise<HomeScreenWidget | undefined> {
    switch (widgetConfig.componentName) {
      case WidgetId.PhotoOfTheDay:
        const photoOfTheDayData = await this.getPhotoOfTheDayWidgetData(
          widgetConfig.settings as PhotoOfTheDayWidgetSettings
        );

        return {
          componentName: widgetConfig.componentName,
          data: photoOfTheDayData
        } as HomeScreenWidget;

        break;

      case WidgetId.Calendar:
        // const events = await this.calendarService.getCalendarEvents();
        return {
          componentName: widgetConfig.componentName,
          data: { events: [] } as CalendarWidgetData
        };
        break;

      case WidgetId.ForYou:
        const data: ForYouWidgetData = {};

        const settings = widgetConfig.settings as ForYouWidgetSettings;
        if (settings.photo.source === PhotoSource.Pexels) {
          const photos = await this.photosService.getPhotosFromCollection(
            settings.photo.settings.collectionId
          );
          data.photo = randomElement(photos);
        }

        return {
          componentName: widgetConfig.componentName,
          data
        };
        break;
    }
  }
}

export enum WidgetId {
  ForYou = 'ForYouWidget',
  Calendar = 'CalendarWidget',
  PhotoOfTheDay = 'PhotoOfTheDayWidget'
}
