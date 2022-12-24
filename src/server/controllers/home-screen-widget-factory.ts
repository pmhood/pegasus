import { HomeScreenWidget } from '../../common/dto/home-response';
import { WidgetConfig } from '../config/pegasus-config';

export class HomeScreenWidgetFactory {
  public static make(widgetConfigs: WidgetConfig[]): HomeScreenWidget[] {
    return [];
  }
}
