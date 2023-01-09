import * as moment from 'moment';
import axios from 'axios';
import { CacheService } from '../../cache/cache-service';
import { CardWidgetDisplayable } from '../../widgets/containers/card-widget/card-widget-displayable';
import { CardWidgetResponseData } from '../../widgets/containers/card-widget/card-widget-response-data';
import { MealViewerPluginSettings } from './meal-viewer-plugin-settings';
import { CardWidgetType } from '../../../common/dto/card-widget-type';

const api = 'https://api.mealviewer.com/api/v4/school/{school}/{date}/{date}/0';

export class MealViewerPlugin implements CardWidgetDisplayable {
  public static id = 'mealViewer';

  private readonly cacheKey: string;

  constructor(
    private readonly settings: MealViewerPluginSettings,
    private readonly cacheService: CacheService
  ) {
    console.log(`MealViewerPlugin settings: ${JSON.stringify(settings)}`);
    this.cacheKey = `${MealViewerPlugin.id}-${settings.schoolName}`;
  }

  public async getCardWidgetResponseData(): Promise<
    CardWidgetResponseData[] | undefined
  > {
    const items = await this.fetchItems();
    if (!items) {
      console.warn(`No items found: ${JSON.stringify(this.settings)}`);
      return;
    }

    const set = new Set(items);

    return [
      {
        type: CardWidgetType.TextOverlay,
        title: Array.from(set).join(', ')
      }
    ] as CardWidgetResponseData[];
  }

  private async fetchItems(): Promise<string[]> {
    let items = await this.cacheService.get(this.cacheKey);
    if (!items) {
      console.log(`No cache found for: ${this.cacheKey}`);
      try {
        items = await this.fetchLunchItems();
        await this.cacheService.set(this.cacheKey, items);
      } catch (e) {
        items = [];
      }
    }

    return items;
  }

  private async fetchLunchItems(): Promise<string[]> {
    const date = moment().format('DD-MM-yyyy');
    const url = api
      .replace('{school}', this.settings.schoolName)
      .replaceAll('{date}', date);
    console.log(`calling ${url}`);
    const response = await axios.get(url);
    if (!response.data) {
      console.error(`Failed to get data`);
      return [];
    }

    const jsonResponse = response.data as MealViewerResponse;
    const lunchBlock = jsonResponse.menuSchedules[0].menuBlocks.filter(
      (block) => block.blockName === BlockName.Lunch
    );
    const cafeteriaLines = (lunchBlock[0] as unknown as MenuBlock)
      .cafeteriaLineList.data as CafeteriaLine[];

    const foodItems = cafeteriaLines[0].foodItemList.data as FoodItemObject[];
    const entrees = foodItems.filter(
      (item) => item.item_Type === ItemType.Entrees
    );

    return entrees.map((entree) => entree.item_Name);
  }
}

interface MealViewerResponse {
  menuSchedules: MenuSchedule[];
}

interface MenuSchedule {
  menuBlocks: Object[];
}

interface MenuBlock {
  cafeteriaLineList: ListObject;
}

interface Object {
  object: ObjectType;
  blockName: BlockName;
}

interface FoodItemObject extends Object {
  block_Name: string;
  item_Name: string;
  item_Type: ItemType;
}

interface CafeteriaLine extends Object {
  foodItemList: ListObject;
}

interface ListObject extends Object {
  data: Object[];
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
