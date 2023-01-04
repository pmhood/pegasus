import { WidgetFactory } from '../../widgets/widget-factory';
import { Layout } from '../layout';
import { SingleLayoutResponse } from './single-layout-response';
import { SingleLayoutSettings } from './single-layout-settings';

export class SingleLayout implements Layout {
  public static readonly id = 'single';

  constructor(private readonly settings: SingleLayoutSettings) {}

  public async getResponseData(): Promise<SingleLayoutResponse> {
    const widget = WidgetFactory.make(this.settings);
    const data = await widget?.getResponseData();

    return {
      layout: SingleLayout.id,
      main: data
    } as SingleLayoutResponse;
  }
}
