import { WidgetFactory } from '../../widgets/widget-factory';
import { MultiLayoutSettings } from './multi-layout-settings';
import { MultiLayoutResponse } from './multi-layout-response';
import { Layout } from '../layout';

export class MultiLayout implements Layout {
  public static readonly id = 'multi';

  constructor(private readonly settings: MultiLayoutSettings) {}

  public async getResponseData(): Promise<MultiLayoutResponse> {
    const leftWidget = WidgetFactory.make(this.settings.left);
    const leftWidgetData = await leftWidget?.getResponseData();

    const rightTopWidget = WidgetFactory.make(this.settings.rightTop);
    const rightTopWidgetData = await rightTopWidget?.getResponseData();

    const rightBottomLeftWidget = WidgetFactory.make(
      this.settings.rightBottomLeft
    );
    const rightBottomLeftWidgetData =
      await rightBottomLeftWidget?.getResponseData();

    const rightBottomRightWidget = WidgetFactory.make(
      this.settings.rightBottomRight
    );
    const rightBottomRightWidgetData =
      await rightBottomRightWidget?.getResponseData();

    return {
      layout: MultiLayout.id,
      left: leftWidgetData,
      rightTop: rightTopWidgetData,
      rightBottomLeft: rightBottomLeftWidgetData,
      rightBottomRight: rightBottomRightWidgetData
    } as MultiLayoutResponse;
  }
}
