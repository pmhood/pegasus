import { PluginFactory } from '../../../plugins/plugin-factory';
import { Widget } from '../../widget';
import { CardWidgetResponseData } from './card-widget-response-data';
import {
  CardWidgetDisplayable,
  isCardWidgetDisplayable
} from './card-widget-displayable';
import { CardWidgetSettings } from './card-widget-settings';

export class CardWidget implements Widget {
  public static readonly id = 'card';
  private readonly plugin: CardWidgetDisplayable | undefined;

  constructor(settings: CardWidgetSettings) {
    const plugin = PluginFactory.make(settings.plugin);
    if (plugin && isCardWidgetDisplayable(plugin)) {
      this.plugin = plugin;
    } else {
      console.warn(`${settings.plugin.pluginId} is not CardWidgetDisplayable`);
    }
  }

  public async getResponseData(): Promise<CardWidgetResponseData | undefined> {
    const data = await this.plugin?.getCardWidgetResponseData();
    console.log(`CardWidget response: ${JSON.stringify(data)}`);
    if (data) {
      data.componentName = CardWidget.id;
    }
    return data;
  }
}
