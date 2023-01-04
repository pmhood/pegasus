import { Widget } from '../widget';
import { ForYouWidgetResponseData } from './for-you-widget-response-data';

export class ForYouWidget implements Widget {
  public static readonly id = 'forYou';

  public async getResponseData(): Promise<ForYouWidgetResponseData> {
    return {
      componentName: ForYouWidget.id,
      imageUrl:
        'https://images.pexels.com/photos/5137655/pexels-photo-5137655.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    };
  }
}
