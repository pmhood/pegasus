import { CacheService } from '../cache/cache-service';
// import { PhotoPlugin } from './core/photos/photo-plugin';
// import { RssPlugin } from './core/rss/rss-plugin';

export class PluginFactory {
  public static cacheService: CacheService;
  private static plugins: { [key: string]: any } = {};

  public static register(key: string, classDef: any) {
    PluginFactory.plugins[key] = classDef;
  }

  public static make(pluginData: PluginData): any | undefined {
    const pluginClass = PluginFactory.plugins[pluginData.pluginId];
    if (pluginClass) {
      return new pluginClass(pluginData.settings, this.cacheService);
    }

    console.error(`PluginFactory: Cannot find '${pluginData.pluginId}'`);
  }
}

export interface PluginData {
  pluginId: string;
  settings: any;
}
