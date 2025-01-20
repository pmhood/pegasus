import { FullCalendarEvent } from '../../../../../common/dto/full-calendar-event';
import { CalendarSource } from '../calendar-source';
import * as moment from 'moment';
import axios from 'axios';

const api =
  'https://api.mealviewer.com/api/v4/school/{school}/{startDate}/{endDate}/0';

export class CalendarMealviewerSource implements CalendarSource {
  public async getEvents(
    sourceId: string,
    url: string,
    titlePrefix: string = ''
  ): Promise<FullCalendarEvent[]> {
    const events: FullCalendarEvent[] = [];

    try {
      const items = await this.fetchItems();
      // Loop through key and value of items
      for (const [date, foodItems] of Object.entries(items)) {
        const foodItemNames = Array.from(foodItems as Set<string>).join(', ');
        const item = {
          id: `${date}-${foodItemNames}`,
          title: `${titlePrefix} ${foodItemNames}`,
          description: foodItemNames,
          start: moment(date).toISOString(),
          end: moment(date).toISOString(),
          allDay: true,
          sourceId
        } as FullCalendarEvent;
        events.push(item);
      }
    } catch (err) {
      console.error(err);
    }

    return events;
  }

  private async fetchItems(): Promise<EntreeByDate> {
    let items: EntreeByDate = {};
    try {
      items = await this.fetchLunchItems();
    } catch (e) {
      console.error(e);
      items = {};
    }

    return items;
  }

  private async fetchLunchItems(): Promise<EntreeByDate> {
    const startOfMonth = moment().startOf('month').format('MM-DD-yyyy');
    const endOfMonth = moment().add(3, 'M').endOf('month').format('MM-DD-yyyy');
    const url = api
      .replace('{school}', 'SummerlakeElementary')
      .replaceAll('{startDate}', startOfMonth)
      .replaceAll('{endDate}', endOfMonth);
    console.log(`calling ${url}`);
    const response = await axios.get(url);
    if (!response.data) {
      console.error(`Failed to get data`);
      return {};
    }

    const jsonResponse = response.data as MealViewerResponse;
    const entrees: EntreeByDate = {};
    jsonResponse.menuSchedules.forEach((menuSchedule) => {
      const lunchBlocks = menuSchedule.menuBlocks.filter((block) => {
        return block.blockName === BlockName.Lunch;
      });
      lunchBlocks.forEach((lunchBlock) => {
        lunchBlock.cafeteriaLineList.data.forEach((cafeteriaLine) => {
          cafeteriaLine.foodItemList.data.forEach((foodItem) => {
            if (foodItem.item_Type === ItemType.Entrees) {
              if (!entrees[foodItem.menu_Block_Date]) {
                entrees[foodItem.menu_Block_Date] = new Set<string>();
              }
              entrees[foodItem.menu_Block_Date].add(foodItem.item_Name);
            }
          });
        });
      });
    });

    return entrees;
  }
}

interface EntreeByDate {
  [date: string]: Set<string>;
}

interface MealViewerResponse {
  menuSchedules: MenuSchedule[];
}

interface MenuSchedule {
  menuBlocks: MenuBlock[];
}

interface MenuBlock {
  blockName: BlockName;
  scheduledDate: string;
  cafeteriaLineList: ListObject<CafeteriaLine>;
}

interface Object {
  object: ObjectType;
  blockName: BlockName;
  scheduledDate: string;
}

interface FoodItemObject extends Object {
  id: number;
  block_Name: string;
  item_Name: string;
  item_Type: ItemType;
  menu_Block_Date: string;
}

interface CafeteriaLine extends Object {
  foodItemList: ListObject<FoodItemObject>;
}

interface ListObject<T> extends Object {
  data: T[];
}

enum ObjectType {
  MenuBlock = 'menuBlock',
  List = 'list',
  FoodItem = 'foodItem'
}

enum ItemType {
  Entrees = 'Entrees'
}
enum BlockName {
  Lunch = 'Lunch'
}
