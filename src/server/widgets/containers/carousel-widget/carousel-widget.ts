import { CardWidgetType } from '../../../../common/dto/card-widget-type';
import { PluginFactory } from '../../../plugins/plugin-factory';
import { Widget } from '../../widget';
import { CardWidget } from '../card-widget/card-widget';
import {
  CardWidgetDisplayable,
  isCardWidgetDisplayable
} from '../card-widget/card-widget-displayable';
import { CardWidgetResponseData } from '../card-widget/card-widget-response-data';
import { CarouselWidgetResponseData } from './carousel-widget-response-data';
import { CarouselWidgetSettings } from './carousel-widget-settings';

export class CarouselWidget implements Widget {
  public static readonly id = 'carousel';
  //TODO: carousel is a container, but any type of container could be inside it - card, image, etc.
  private readonly plugins: CardWidgetDisplayable[] = [];

  constructor(private readonly settings: CarouselWidgetSettings) {
    settings.plugins.forEach((pluginSettings) => {
      const plugin = PluginFactory.make(pluginSettings);
      if (plugin && isCardWidgetDisplayable(plugin)) {
        this.plugins.push(plugin);
      } else {
        console.warn(`${pluginSettings.pluginId} is not CardWidgetDisplayable`);
      }
    });
  }

  public async getResponseData(): Promise<
    CarouselWidgetResponseData | undefined
  > {
    const items = (
      await Promise.all(
        this.plugins.map(async (plugin) => {
          const data = await plugin.getCardWidgetResponseData();
          // console.log(
          //   `CarouselWidget-CardWidget response: ${JSON.stringify(data)}`
          // );
          if (data) {
            data.forEach((item) => {
              item.componentName = CardWidget.id;
              item.type = CardWidgetType.ImageWithText;
            });
          }
          return data;
        })
      )
    )
      .flatMap((item) => item)
      .filter((item): item is CardWidgetResponseData => !!item);

    return {
      componentName: CarouselWidget.id,
      transitionType: this.settings.transitionType,
      transitionTime: this.settings.transitionTime,
      items
    } as CarouselWidgetResponseData;
  }
}
