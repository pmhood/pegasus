import * as express from 'express';
import { PegasusConfig } from '../config/pegasus-config';
import { CalendarController } from '../controllers/calendar-controller';
import { HomeController } from '../controllers/home-controller';

export class ScreensRoutes {
  public static addRoutes(app: express.Application, config: PegasusConfig) {
    const homeController = new HomeController();
    const calendarController = new CalendarController();

    app.get('/api/screens/home', async (req, res) => {
      const response = await homeController.getData();
      res.send(response);
    });

    app.get('/api/screens/calendar', async (req, res) => {
      const response = await calendarController.getData();
      res.send(response);
    });
  }
}
