import { PegasusConfig } from './pegasus-config';
import * as fs from 'fs';

export class ConfigService {
  private config: PegasusConfig | undefined;

  constructor() {
    this.config = JSON.parse(
      fs.readFileSync(process.env['PEGASUS_CONFIG_FILEPATH'] as string, 'utf8')
    ) as PegasusConfig;
  }

  public async getConfig(): Promise<PegasusConfig | undefined> {
    return this.config;
  }
}
