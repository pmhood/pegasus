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
    console.log(PluginFactory.plugins);
    const pluginClass = PluginFactory.plugins[pluginData.pluginId];
    if (pluginClass) {
      return new pluginClass(pluginData.settings, this.cacheService);
    }
    // switch (pluginData.pluginId) {
    //   case RssPlugin.id:
    //     return new RssPlugin(pluginData.settings, this.cacheService);
    //   case PhotoPlugin.id:
    //     return new PhotoPlugin(pluginData.settings, this.cacheService);
    // }
  }
}

export interface PluginData {
  pluginId: string;
  settings: any;
}
