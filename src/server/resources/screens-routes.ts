import * as express from 'express';
import { CacheService } from '../cache/cache-service';
import { PegasusConfig } from '../config/pegasus-config';
// import { CalendarController } from '../controllers/calendar-controller';
// import { HomeController } from '../controllers/home-controller';
import { ScreenController } from '../controllers/screen-controller';
// import { RssPlugin } from '../plugins/core/rss/rss-plugin';

export class ScreensRoutes {
  public static addRoutes(
    app: express.Application,
    config: PegasusConfig,
    cacheService: CacheService
  ) {
    // const homeController = new HomeController();
    // const calendarController = new CalendarController();

    app.get('/api/screens/home', async (req, res) => {
      const screenController = new ScreenController(config.screens.home);
      const response = await screenController.getResponseData();

      res.send(response);
    });

    app.get('/api/screens/calendar', async (req, res) => {
      // const response = await calendarController.getData();
      // res.send(response);
      const screenController = new ScreenController(config.screens.calendar);
      const response = await screenController.getResponseData();

      res.send(response);
    });

    // app.get('/api/rss', async (req, res) => {
    //   const p = new RssPlugin({ sources: [] });
    //   await p.fetchItemsForSources([]);

    //   res.sendStatus(200);
    // });
  }
}
