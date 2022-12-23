if (process.env.ENVIRONMENT !== 'prod') {
  require('dotenv').config();
}

import * as express from 'express';
import { Application } from 'express';
import { ConfigService } from './config/config-service';
import {
  EnvironmentVar,
  getEnvVar,
  Environment
} from './config/environment-var';
import { PegasusConfig } from './config/pegasus-config';
import { PluginLocator } from './plugins/plugin-locator';
import { ScreensRoutes } from './resources/screens-routes';

const PORT = 3000;

class Server {
  private app: Application = express();

  private createPlugins(config: PegasusConfig) {
    for (const [key, value] of Object.entries(config.plugins)) {
      PluginLocator.add(key, value);
    }
  }

  public async setup() {
    const configService = new ConfigService();
    const config = await configService.getConfig();
    if (!config) {
      throw new Error('No config found');
    }
    this.createPlugins(config);

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
