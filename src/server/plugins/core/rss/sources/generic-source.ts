import * as RssParser from 'rss-parser';
import { RssItem } from '../../../../../common/dto/rss-item';
import { RssSource } from '../rss-source';
import { RssPluginSettings } from '../rss-plugin-settings';

const numItems = 3;

type CustomFeed = {};
type CustomItem = { imageUrl: string; description: string };

export class GenericSource implements RssSource {
  public static id = 'generic';

  constructor(private readonly settings: RssPluginSettings) {}

  public async fetchItems(): Promise<RssItem[]> {
    try {
      const parser: RssParser<CustomFeed, CustomItem> = new RssParser({
        customFields: {
          item: ['imageUrl', 'description']
        }
      });
      const feed = await parser.parseURL(this.settings.url);

      const topItems = feed.items.slice(0, numItems);
      console.log(topItems);
      const rssItems = topItems.map((item) => {
        return {
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl
        } as RssItem;
      });
      return rssItems;
    } catch (e) {
      console.error(`Error parsing RSS: ${e.message}`);
      return [];
    }
  }
}
