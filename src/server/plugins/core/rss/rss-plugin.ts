import { RssItem } from '../../../../common/dto/rss-item';
import { CacheService } from '../../../cache/cache-service';
import { CardWidgetResponseData } from '../../../widgets/containers/card-widget/card-widget-response-data';
import { CardWidgetDisplayable } from '../../../widgets/containers/card-widget/card-widget-displayable';
import { RssPluginSettings } from './rss-plugin-settings';
import { RssSource } from './rss-source';
import { BbcNewsSource } from './sources/bbc-news-source';

export class RssPlugin implements CardWidgetDisplayable {
  public static id = 'core/rss';

  private readonly cacheKey: string;
  private readonly sources: { [key: string]: RssSource };

  constructor(
    private readonly settings: RssPluginSettings,
    private readonly cacheService: CacheService
  ) {
    console.log(`RSSPlugin settings: ${JSON.stringify(settings)}`);
    this.cacheKey = `${RssPlugin.id}-${settings.sourceId}`;

    // Store source ID => source impl
    this.sources = {
      [BbcNewsSource.id]: new BbcNewsSource()
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
      title: items[0].title,
      description: items[0].description,
      imageUrl: items[0].imageUrl,
      linkUrl: ''
    } as CardWidgetResponseData;
  }

  private async fetchItems(): Promise<RssItem[]> {
    let items = await this.cacheService.get(this.cacheKey);
    if (!items) {
      console.log(`No cache found for: ${this.cacheKey}`);
      items = await this.sources[this.settings.sourceId]?.fetchItems();

      await this.cacheService.set(this.cacheKey, items);
    }

    return items;
  }
}
