import { CalendarEvent } from '../dto/home-response';
import { CalendarService } from '../services/calendar/calendar-service';

export class CalendarController {
  public async getData(): Promise<CalendarScreenResponse> {
    const calService = new CalendarService();
    const events = await calService.getCalendarEvents();

    return {
      events
    };
  }
}

export interface CalendarScreenResponse {
  events: CalendarEvent[];
}
