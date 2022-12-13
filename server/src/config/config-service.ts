import { Config } from './config';
import * as fs from 'fs';

export class ConfigService {
  private config: Config | undefined;

  constructor() {
    this.config = JSON.parse(
      fs.readFileSync(process.env['PEGASUS_CONFIG_FILEPATH'] as string, 'utf8')
    ) as Config;
  }

  public async getConfig(): Promise<Config | undefined> {
    return this.config;
  }
}
