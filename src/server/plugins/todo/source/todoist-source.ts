import { TodoItem } from '../../../../common/dto/todo-item';
import { getEnvVar, EnvironmentVar } from '../../../config/environment-var';
import { TodoistApi } from '@doist/todoist-api-typescript';

export class TodoistSource {
  private readonly api: TodoistApi;

  constructor(private readonly projectName: string) {
    const apiToken = getEnvVar(EnvironmentVar.TodoistApiToken);
    if (apiToken) {
      this.api = new TodoistApi(apiToken);
    } else {
      throw new Error(`No token for TodoistSource`);
    }
  }
  public async fetchItems(): Promise<TodoItem[]> {
    const projects = await this.api.getProjects();
    const project = projects.find(
      (project) => project.name === this.projectName
    );
    if (!project) {
      console.warn(`TodoistSource: No project found named ${this.projectName}`);
      return [];
    }

    const tasks = await this.api.getTasks({ projectId: project.id });

    console.log(`TodoistSource found ${tasks.length} items`);

    return tasks.map((task) => {
      return {
        id: task.id,
        name: task.content,
        priority: task.priority
      } as TodoItem;
    });
  }
}
