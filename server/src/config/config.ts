/*

// photo of the day
{
	id: "photoOfTheDay",
	componentName: "",
	settings: {
		provider: "unsplash",
		options: {
			type: "random"
		}
	}
}

// weather
{
	id: "weather",
	componentName: "",
	settings: {
		provider: "",
		options: {}
	}
}

// calendar
{
	id: "calendar",
	componentName: "",
	settings: {
		provider: "google",
		options: {}
	}
}

{
  screens: {
    home: {
      refreshInterval: number
      widgets: [
        {
          id: string,
          componentName: string,
          settings: any
        }
      ]
    }
  }
}

*/

import { WidgetId } from '../controllers/home-controller';

export interface Config {
  screens: ScreensConfig;
}

export interface ScreensConfig {
  home: HomeScreenConfig;
}

export interface HomeScreenConfig {
  refreshInterval: number;
  widgetConfigs: WidgetConfig[];
}

export interface WidgetConfig {
  id: WidgetId;
  componentName: string;
  settings: CalendarWidgetConfig;
}

export interface CalendarWidgetConfig extends WidgetConfig {
  dataSources: GmailCalenderWidgetConfig;
}

export interface GmailCalenderWidgetConfig {}
