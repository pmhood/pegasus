import * as express from 'express';
import { Config } from '../config/config';
import { ConfigService } from '../config/config-service';
import { CalendarController } from '../controllers/calendar-controller';
import { HomeController } from '../controllers/home-controller';

export class ScreensRoutes {
  public static addRoutes(app: express.Application, config: Config) {
    app.get('/screens/home', async (req, res) => {
      const homeController = new HomeController(new ConfigService());
      const response = await homeController.getData();

      res.send({
        homeScreen: response
      });
    });

    app.get('/screens/calendar', async (req, res) => {
      const calendarController = new CalendarController();
      const response = await calendarController.getData();
      res.send(response);
    });
  }
}
