import { TodoistApi } from '@doist/todoist-api-typescript';
import { EnvironmentVar, getEnvVar } from '../config/environment-var';

export class TodoController {
  private readonly api: TodoistApi;

  constructor() {
    const apiToken = getEnvVar(EnvironmentVar.TodoistApiToken);
    if (apiToken) {
      this.api = new TodoistApi(apiToken);
    } else {
      throw new Error(`No token for TodoistSource`);
    }
  }

  public async closeTask(taskId: string): Promise<boolean> {
    const result = await this.api.closeTask(taskId);

    return result;
  }
}
