import { ScreenResponseData } from '../../common/dto/screen-response-data';
import { Version } from '../config/config-service';
import { LayoutData, LayoutFactory } from '../layouts/layout-factory';
import { PexelsSource } from '../plugins/core/photos/sources/pexels-source';
import { randomElement } from '../utils/array-utils';
// import { UnsplashService } from '../plugins/core/photos/sources/unsplash-service';

export class ScreenController {
  constructor(private readonly settings: ScreenData) {}

  public async getResponseData(): Promise<ScreenResponseData> {
    const layout = LayoutFactory.make(this.settings.layout);
    const responseData = await layout?.getResponseData();

    const pexels = new PexelsSource();
    const items = await pexels.fetchItems({
      collectionId: 'oic4min',
      limit: 10
    });
    const randomItem = randomElement(items);

    return {
      ...responseData,
      backgroundUrl: randomItem.url,
      refreshInterval: this.settings.layout.settings.refreshInterval,
      version: Version
    } as ScreenResponseData;
  }
}

export interface ScreenData {
  layout: LayoutData;
}
