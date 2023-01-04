// import { PluginLocator } from '../plugins/plugin-locator';
// import { CalendarPlugin } from '../plugins/core/calendar/calendar-plugin';
// import { Config } from '../config/config-service';
// import { CalendarScreenResponse } from '../../common/dto/calendar-screen-response';

// export class CalendarController {
//   public async getData(): Promise<CalendarScreenResponse | undefined> {
//     const plugin = PluginLocator.get(CalendarPlugin.id) as CalendarPlugin;
//     if (!plugin) {
//       return;
//     }

//     const config = Config.getConfig();

//     const sources = config.screens.calendar.sources;
//     const events = await plugin.fetchEventsForSources(
//       sources.map((item) => item.id)
//     );
//     const eventsWithColor = events.map((item) => {
//       const source = sources.find((s) => s.id === item.sourceId);
//       if (source) {
//         item.sourceColor = source.color;
//       }
//       return item;
//     });

//     return {
//       events: eventsWithColor,
//       refreshInterval: config.screens.calendar.refreshInterval
//     };
//   }
// }
