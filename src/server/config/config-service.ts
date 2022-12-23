import { PegasusConfig } from './pegasus-config';
import * as fs from 'fs';
import { EnvironmentVar, getEnvVar } from './environment-var';

export class ConfigService {
  private config: PegasusConfig;

  constructor() {
    const filepath = getEnvVar(EnvironmentVar.PegasusConfigFile);
    if (!filepath) {
      throw new Error('no config file found');
    }
    this.config = JSON.parse(
      fs.readFileSync(filepath, 'utf8')
    ) as PegasusConfig;
  }

  public async getConfig(): Promise<PegasusConfig> {
    return this.config;
  }
}
