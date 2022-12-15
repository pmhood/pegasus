import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import { Application, Express, Request, Response } from 'express';
import { Config } from './config/config';
import { ConfigService } from './config/config-service';
import { PluginLocator } from './plugins/plugin-locator';
import { ScreensRoutes } from './resources/screens-routes';

const PORT = 3000;

class Server {
  private app: Application = express();

  private createPlugins(config: Config) {
    for (const [key, value] of Object.entries(config.plugins)) {
      PluginLocator.add(key, value);
    }
  }

  public async setup() {
    const configService = new ConfigService();
    const config = await configService.getConfig();
    if (config) {
      this.createPlugins(config);
    }

    this.app.use(express.static('../src'));

    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('Express + TypeScript Server3');
    });

    this.app.get(
      '/healthcheck',
      (req: express.Request, res: express.Response) => {
        res.send({
          status: 0
        });
      }
    );

    this.app.get(
      '/ical',
      async (req: express.Request, res: express.Response) => {
        const d = `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:MM Test
X-WR-TIMEZONE:America/New_York
BEGIN:VEVENT
DTSTART:20221210T150000Z
DTEND:20221210T153000Z
DTSTAMP:20221213T033231Z
UID:4taejf97kc2pnhp8bqoumtegr9@google.com
CREATED:20221210T183614Z
DESCRIPTION:
LAST-MODIFIED:20221210T183622Z
LOCATION:
SEQUENCE:1
STATUS:CONFIRMED
SUMMARY:def
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART:20221210T203000Z
DTEND:20221210T220000Z
DTSTAMP:20221213T033231Z
UID:6grrgll3qedu3p2jgb6m0iiris@google.com
CREATED:20221210T183607Z
DESCRIPTION:
LAST-MODIFIED:20221210T183609Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:abc
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART:20221210T233000Z
DTEND:20221211T003000Z
DTSTAMP:20221213T033231Z
UID:0o9u4puu3ovhnc36vj21befo0h@google.com
CREATED:20221210T004416Z
DESCRIPTION:This is a great description
LAST-MODIFIED:20221210T025553Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:hi hi hi
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20221210
DTEND;VALUE=DATE:20221211
DTSTAMP:20221213T033231Z
UID:7i2hqe6i3avdj3ms1nhpuf6p4d@google.com
CREATED:20221210T024923Z
LAST-MODIFIED:20221210T024923Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Test All Day
TRANSP:TRANSPARENT
END:VEVENT
BEGIN:VEVENT
DTSTART:20221210T020000Z
DTEND:20221210T030000Z
DTSTAMP:20221213T033231Z
UID:3t4v3vilvrkksnn7ed1ok1lgmd@google.com
CREATED:20221210T004053Z
LAST-MODIFIED:20221210T004053Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:hi
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART:20221209T230000Z
DTEND:20221210T000000Z
DTSTAMP:20221213T033231Z
UID:2jd32cqtpia6tes5ijc12hftqn@google.com
CREATED:20221210T002511Z
LAST-MODIFIED:20221210T002511Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:test appt
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART:20221202T140000Z
DTEND:20221202T150000Z
DTSTAMP:20221213T033231Z
UID:4gpcaa9c632tue7d7eh1f9q7o7@google.com
CREATED:20221130T045232Z
LAST-MODIFIED:20221130T045232Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:go to eye dr
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART:20221201T140000Z
DTEND:20221201T150000Z
DTSTAMP:20221213T033231Z
UID:2maghf4bg6b8eivpbka1ggmsln@google.com
CREATED:20221130T044114Z
LAST-MODIFIED:20221130T044114Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:pick up dog
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART:20221130T150000Z
DTEND:20221130T160000Z
DTSTAMP:20221213T033231Z
UID:6rrfdt1fgrvf3b4cq0cnktoo03@google.com
CREATED:20221130T043652Z
LAST-MODIFIED:20221130T043652Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Do something else
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART:20221130T140000Z
DTEND:20221130T150000Z
DTSTAMP:20221213T033231Z
UID:2od3l3gdvmsdjqlvqnstj64u6o@google.com
CREATED:20221130T042754Z
LAST-MODIFIED:20221130T042754Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Do something
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR`;
        res.setHeader('content-type', 'text/calendar');
        res.send(d);
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
