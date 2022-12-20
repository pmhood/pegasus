import { WidgetConfig } from '../config/pegasus-config';
import { HomeScreenWidget } from '../dto/home-response';

export class HomeScreenWidgetFactory {
  public static make(widgetConfigs: WidgetConfig[]): HomeScreenWidget[] {
    return [];
  }
}
