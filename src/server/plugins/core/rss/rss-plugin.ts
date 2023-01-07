import { RssItem } from '../../../../common/dto/rss-item';
import { CacheService } from '../../../cache/cache-service';
import { CardWidgetResponseData } from '../../../widgets/containers/card-widget/card-widget-response-data';
import { CardWidgetDisplayable } from '../../../widgets/containers/card-widget/card-widget-displayable';
import { RssPluginSettings } from './rss-plugin-settings';
import { RssSource } from './rss-source';
import { GenericSource } from './sources/generic-source';
import * as cheerio from 'cheerio';
import axios from 'axios';

export class RssPlugin implements CardWidgetDisplayable {
  public static id = 'core/rss';

  private readonly cacheKey: string;
  private readonly sources: { [key: string]: any };

  constructor(
    private readonly settings: RssPluginSettings,
    private readonly cacheService: CacheService
  ) {
    console.log(`RSSPlugin settings: ${JSON.stringify(settings)}`);
    this.cacheKey = `${RssPlugin.id}-${settings.id}`;

    // Store source ID => source impl
    this.sources = {
      [GenericSource.id]: GenericSource
    };
  }

  public async getCardWidgetResponseData(): Promise<
    CardWidgetResponseData[] | undefined
  > {
    const items = await this.fetchItems();
    if (!items) {
      console.warn(`No items found: ${JSON.stringify(this.settings)}`);
      return;
    }

    return items.map((item) => {
      return {
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        linkUrl: item.link
      } as CardWidgetResponseData;
    });
  }

  private async fetchItems(): Promise<RssItem[]> {
    let items = (await this.cacheService.get(this.cacheKey)) as RssItem[];
    if (!items) {
      console.log(`No cache found for: ${this.cacheKey}`);
      const classDef = this.sources[this.settings.sourceType];
      if (!classDef) {
        console.error(`No RSS source found for ${this.settings.sourceType}`);
        return [];
      }
      const source = new classDef(this.settings) as RssSource;
      items = await source.fetchItems();

      await this.cacheService.set(this.cacheKey, items, this.settings.cacheTtl);
    }

    console.log(
      `RSS Plugin: Found ${items?.length} items for ${this.cacheKey}`
    );

    const slicedItems = items.slice(0, this.settings.limit ?? 3);
    slicedItems.forEach(async (item) => {
      const imageUrl = await this.fetchImageUrlFromLink(item.link);
      if (imageUrl) {
        item.imageUrl = imageUrl;
      }
    });

    return slicedItems;
  }

  private async fetchImageUrlFromLink(
    link: string
  ): Promise<string | undefined> {
    console.log(`Fetching from ${link}`);
    const response = await axios.get(link);
    const html = response.data;
    const $ = cheerio.load(html);

    const imageUrl = $('meta[property="og:image"]').attr('content');
    console.log(`Found image URL: ${imageUrl}`);
    return imageUrl;
  }
}
