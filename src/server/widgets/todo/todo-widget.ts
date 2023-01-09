import { PluginFactory } from '../../plugins/plugin-factory';
import { Widget } from '../widget';
import {
  isTodoWidgetDisplayable,
  TodoWidgetDisplayable
} from './todo-widget-displayable';
import { TodoWidgetResponseData } from './todo-widget-response-data';
import { TodoWidgetSettings } from './todo-widget-settings';

export class TodoWidget implements Widget {
  public static readonly id = 'todo';
  private readonly plugin: TodoWidgetDisplayable | undefined;

  constructor(settings: TodoWidgetSettings) {
    const plugin = PluginFactory.make(settings.plugin);
    if (plugin && isTodoWidgetDisplayable(plugin)) {
      this.plugin = plugin;
    } else {
      console.warn(`${settings.plugin.pluginId} is not TodoWidgetDisplayable`);
    }
  }

  public async getResponseData(): Promise<TodoWidgetResponseData | undefined> {
    const data = await this.plugin?.getTodoWidgetResponseData();
    console.log(`TodoWidget response: ${JSON.stringify(data)}`);
    if (data) {
      data.componentName = TodoWidget.id;
    }
    return data;
  }
}
