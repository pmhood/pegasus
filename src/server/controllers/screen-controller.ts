import { ScreenResponseData } from '../../common/dto/screen-response-data';
import { LayoutData, LayoutFactory } from '../layouts/layout-factory';

export class ScreenController {
  constructor(private readonly settings: ScreenData) {}

  public async getResponseData(): Promise<ScreenResponseData> {
    const layout = LayoutFactory.make(this.settings.layout);
    const responseData = await layout?.getResponseData();
    return {
      ...responseData
    } as ScreenResponseData;
  }
}

export interface ScreenData {
  layout: LayoutData;
  refreshInterval: number;
}
