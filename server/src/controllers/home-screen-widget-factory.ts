import { WidgetConfig } from '../config/config';
import { HomeScreenWidget } from '../dto/home-response';

export class HomeScreenWidgetFactory {
  public static make(widgetConfigs: WidgetConfig[]): HomeScreenWidget[] {
    return [];
  }
}
