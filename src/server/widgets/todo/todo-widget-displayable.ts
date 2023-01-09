import { TodoWidgetResponseData } from './todo-widget-response-data';

export interface TodoWidgetDisplayable {
  getTodoWidgetResponseData(): Promise<TodoWidgetResponseData | undefined>;
}

export function isTodoWidgetDisplayable(
  object: any
): object is TodoWidgetDisplayable {
  if (!object) {
    return false;
  }
  return 'getTodoWidgetResponseData' in object;
}
