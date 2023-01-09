import { TodoItem } from '../../../common/dto/todo-item';

export interface TodoWidgetResponseData {
  componentName: string;
  items: TodoItem[];
}
