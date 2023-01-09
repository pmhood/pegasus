if (process.env.ENVIRONMENT !== 'prod') {
  require('dotenv').config();
}

import * as express from 'express';
import { Application } from 'express';
import { CacheService } from './cache/cache-service';
import { ConfigService } from './config/config-service';
import {
  EnvironmentVar,
  getEnvVar,
  Environment
} from './config/environment-var';
import { CalendarPlugin } from './plugins/core/calendar/calendar-plugin';
import { PhotoPlugin } from './plugins/core/photos/photo-plugin';
import { RssPlugin } from './plugins/core/rss/rss-plugin';
import { MealViewerPlugin } from './plugins/meal-viewer/meal-viewer-plugin';
import { PluginFactory } from './plugins/plugin-factory';
import { ScreensRoutes } from './resources/screens-routes';

const PORT = 3000;

class Server {
  private app: Application = express();

  private registerPlugins() {
    PluginFactory.register(RssPlugin.id, RssPlugin);
    PluginFactory.register(PhotoPlugin.id, PhotoPlugin);
    PluginFactory.register(CalendarPlugin.id, CalendarPlugin);
    PluginFactory.register(MealViewerPlugin.id, MealViewerPlugin);
  }

  public async setup() {
    // Register plugins
    this.registerPlugins();

    // Load config
    const configService = new ConfigService();
    configService.loadConfig();
    const config = await configService.getConfig();
    if (!config) {
      throw new Error('No config found');
    }

    // Setup middleware
    if (getEnvVar(EnvironmentVar.Enviroment) === Environment.Prod) {
      this.app.use(express.static('client'));
    } else {
      this.app.use(express.static('../src'));
    }

    // this.app.get('/', (req: express.Request, res: express.Response) => {
    //   res.send('Express + TypeScript Server3');
    // });

    this.app.get(
      '/healthcheck',
      (req: express.Request, res: express.Response) => {
        res.send({
          status: 0
        });
      }
    );

    const cacheService = new CacheService();
    PluginFactory.cacheService = cacheService;

    ScreensRoutes.addRoutes(this.app, config);
  }

  public listen() {
    this.app.listen(PORT, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${PORT}`
      );
    });
  }
}

const server = new Server();
server.setup();
server.listen();
