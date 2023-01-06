import * as express from 'express';
import { PegasusConfig } from '../config/pegasus-config';
import { ScreenController } from '../controllers/screen-controller';

export class ScreensRoutes {
  public static addRoutes(app: express.Application, config: PegasusConfig) {
    app.get('/api/screens/:screen', async (req, res) => {
      try {
        const screenController = new ScreenController(
          config.screens[req.params.screen]
        );
        const response = await screenController.getResponseData();

        res.send(response);
      } catch (e) {
        console.error(e);
        res.status(500).send({
          message: e.message
        });
      }
    });
  }
}
