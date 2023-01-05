import { RssItem } from '../../../../common/dto/rss-item';
import { CacheService } from '../../../cache/cache-service';
import { CardWidgetResponseData } from '../../../widgets/containers/card-widget/card-widget-response-data';
import { CardWidgetDisplayable } from '../../../widgets/containers/card-widget/card-widget-displayable';
import { RssPluginSettings } from './rss-plugin-settings';
import { RssSource } from './rss-source';
import { BbcNewsSource } from './sources/bbc-news-source';
import { GenericSource } from './sources/generic-source';

export class RssPlugin implements CardWidgetDisplayable {
  public static id = 'core/rss';

  private readonly cacheKey: string;
  private readonly sources: { [key: string]: any };

  constructor(
    private readonly settings: RssPluginSettings,
    private readonly cacheService: CacheService
  ) {
    console.log(`RSSPlugin settings: ${JSON.stringify(settings)}`);
    this.cacheKey = `${RssPlugin.id}-${settings.sourceId}`;

    // Store source ID => source impl
    this.sources = {
      [BbcNewsSource.id]: BbcNewsSource,
      [GenericSource.id]: GenericSource
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
      const classDef = this.sources[this.settings.sourceId];
      if (!classDef) {
        console.error(`No RSS source found for ${this.settings.sourceId}`);
        return [];
      }
      const source = new classDef(this.settings) as RssSource;
      items = await source.fetchItems();

      await this.cacheService.set(this.cacheKey, items);
    }

    return items;
  }
}
