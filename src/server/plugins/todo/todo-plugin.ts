import { CacheService } from '../../cache/cache-service';
import { TodoPluginSettings } from './todo-plugin-settings';
import { TodoistSource } from './source/todoist-source';
import { TodoWidgetDisplayable } from '../../widgets/todo/todo-widget-displayable';
import { TodoWidgetResponseData } from '../../widgets/todo/todo-widget-response-data';
import { TodoItem } from '../../../common/dto/todo-item';

export class TodoPlugin implements TodoWidgetDisplayable {
  public static id = 'todo';

  private readonly cacheKey: string;
  private readonly source: TodoistSource;

  constructor(
    private readonly settings: TodoPluginSettings,
    private readonly cacheService: CacheService
  ) {
    console.log(`TodoPlugin settings: ${JSON.stringify(settings)}`);
    this.cacheKey = `${TodoPlugin.id}-${settings.projectName}`;
    this.source = new TodoistSource(this.settings.projectName);
  }

  public async getTodoWidgetResponseData(): Promise<
    TodoWidgetResponseData | undefined
  > {
    const items = await this.fetchItems();
    if (!items) {
      console.warn(`No items found: ${JSON.stringify(this.settings)}`);
      return;
    }

    return {
      items
    } as TodoWidgetResponseData;
  }

  private async fetchItems(): Promise<TodoItem[]> {
    let items = await this.cacheService.get(this.cacheKey);
    if (!items) {
      console.log(`No cache found for: ${this.cacheKey}`);
      try {
        items = await this.source.fetchItems();
        await this.cacheService.set(this.cacheKey, items);
      } catch (e) {
        items = [];
      }
    }

    return items;
  }
}
