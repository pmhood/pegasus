import { CacheService } from '../../../cache/cache-service';
import { CardWidgetResponseData } from '../../../widgets/containers/card-widget/card-widget-response-data';
import { CardWidgetDisplayable } from '../../../widgets/containers/card-widget/card-widget-displayable';
import { PhotoSource } from './photo-source';
import { PhotoPluginSettings } from './photo-plugin-settings';
import { PexelsSource } from './sources/pexels-source';
import { PhotoItem } from '../../../../common/dto/photo-item';
import { randomElement } from '../../../utils/array-utils';

export class PhotoPlugin implements CardWidgetDisplayable {
  public static id = 'core/photo';

  private readonly cacheKey: string;
  private readonly sources: { [key: string]: PhotoSource };

  constructor(
    private readonly settings: PhotoPluginSettings,
    private readonly cacheService: CacheService
  ) {
    console.log(`PhotoPlugin settings: ${JSON.stringify(settings)}`);
    this.cacheKey = `${PhotoPlugin.id}-${settings.sourceId}`;

    // Store source ID => source impl
    // TODO: Do this lazily?
    this.sources = {
      [PexelsSource.id]: new PexelsSource()
    };
  }

  public async getCardWidgetResponseData(): Promise<
    CardWidgetResponseData | undefined
  > {
    const items = await this.fetchItems();
    if (!items) {
      console.warn(`No items found: ${JSON.stringify(this.settings)}`);
      return;
    }

    return {
      //title: items[0].title,
      // description: items[0].photographer,
      imageUrl: items[0].url
    } as CardWidgetResponseData;
  }

  private async fetchItems(): Promise<PhotoItem[]> {
    let items = await this.cacheService.get(this.cacheKey);
    if (!items) {
      console.log(`No cache found for: ${this.cacheKey}`);
      items = await this.sources[this.settings.sourceId]?.fetchItems(
        this.settings
      );

      await this.cacheService.set(this.cacheKey, items);
    }

    if (this.settings.random) {
      console.log('picking random element');
      items = [randomElement(items)];
    }

    // TODO: use limit

    return items;
  }
}
