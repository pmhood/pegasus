import axios from 'axios';
import * as RssParser from 'rss-parser';
import * as cheerio from 'cheerio';
import { RssItem } from '../../../../../common/dto/rss-item';
import { RssSource } from '../rss-source';

const feedUrl = 'http://feeds.bbci.co.uk/news/rss.xml';
const numItems = 3;

export class BbcNewsSource implements RssSource {
  public static id = 'bbc';

  public async fetchItems(): Promise<RssItem[]> {
    const parser: RssParser = new RssParser();
    const feed = await parser.parseURL(feedUrl);

    const topItems = feed.items.slice(0, numItems);
    console.log(topItems);
    const rssItems = await Promise.all(
      topItems.map(async (item) => {
        if (!item.link || !item.guid) {
          return;
        }

        console.log(`Fetching from ${item.link}`);
        const response = await axios.get(item.link);
        const html = response.data;
        const $ = cheerio.load(html);

        const imageUrl = $('meta[property="og:image"]').attr('content');

        const rssItem = {
          title: item.title,
          description: item.description,
          imageUrl
        } as RssItem;

        return rssItem;
      })
    );

    return rssItems.filter((item): item is RssItem => !!item);
  }
}
