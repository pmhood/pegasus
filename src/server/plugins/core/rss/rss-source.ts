import { RssItem } from '../../../../common/dto/rss-item';

export interface RssSource {
  fetchItems(): Promise<RssItem[]>;
}
