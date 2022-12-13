import * as dotenv from 'dotenv';
dotenv.config();

// import * as unsplashJs from 'unsplash-js';
import express, { Express, Request, Response } from 'express';
import { Random } from 'unsplash-js/dist/methods/photos/types';
import { ScreensRoutes } from './resources/screens-routes';
import { CalendarService } from './services/calendar/calendar-service';
import * as axios from 'axios';
import * as ical from 'node-ical';

const app: Express = express();
const port = 3000;

app.use(express.static('../src'));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server3');
});

app.get('/healthcheck', (req: Request, res: Response) => {
  res.send({
    status: 0
  });
});

app.get('/ical', async (req: Request, res: Response) => {
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

  // const calResponse = await ical.async.fromURL(
  //   'https://calendar.google.com/calendar/ical/db26bfdd34e830ef0e8dbafdd53e079bcf527e238410728924656d2eed2c981b%40group.calendar.google.com/public/basic.ics',
  //   null,
  //   (err, ics) => {
  //     console.log(ics);
  //   }
  // );

  // // console.log(calResponse);
  // const url =
  //   'https://calendar.google.com/calendar/ical/db26bfdd34e830ef0e8dbafdd53e079bcf527e238410728924656d2eed2c981b%40group.calendar.google.com/public/basic.ics';
  // const { data } = await axios.default.get(url, {
  //   responseType: 'stream'
  // });

  // data.pipe(res);

  // const response = await axios.default.get(
  //   'https://calendar.google.com/calendar/ical/db26bfdd34e830ef0e8dbafdd53e079bcf527e238410728924656d2eed2c981b%40group.calendar.google.com/public/basic.ics',
  //   {}
  // );
  // console.log(response);
  // console.log(typeof response.data);
  // // console.log(response.data);
  // res.setHeader('content-type', 'text/calendar');
  // res.send(response.data);
});

ScreensRoutes.addRoutes(app);

// app.get('/photos', async (req: Request, res: Response) => {
//   const result = await unsplash.search.getPhotos({
//     query: 'cat',
//     page: 1,
//     perPage: 10,
//     color: 'green',
//     orientation: 'portrait'
//   });

//   // response.response?.results[0].

//   // console.log(response);

//   res.send(result.response);
// });

// app.get('/photos/random', async (req: Request, res: Response) => {
//   try {
//     const result = await unsplash.photos.getRandom({
//       count: 1,
//       contentFilter: 'high',
//       // topicIds: ['nature'],
//       // query: 'weather',
//       collectionIds: ['162468']
//       // orientation: 'landscape'
//     });
//     console.log(JSON.stringify(result));
//     if (result.errors) {
//       // handle error here
//       console.log('error occurred: ', result.errors[0]);
//       res.sendStatus(500);
//     } else {
//       // handle success here
//       const photos = result.response as Random[];
//       res.send({
//         url: photos[0].urls.thumb
//       });

//       unsplash.photos.trackDownload({
//         downloadLocation: photos[0].links.download_location
//       });
//     }
//   } catch (err) {
//     res.status(500).send({ message: err });
//   }
// });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
