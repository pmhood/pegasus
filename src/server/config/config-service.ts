import { PegasusConfig } from './pegasus-config';
import * as fs from 'fs';
import { EnvironmentVar, getEnvVar } from './environment-var';

export class ConfigService {
  private config: PegasusConfig | undefined;

  constructor() {
    this.config = JSON.parse(
      fs.readFileSync(getEnvVar(EnvironmentVar.PegasusConfigFile), 'utf8')
    ) as PegasusConfig;
  }

  public async getConfig(): Promise<PegasusConfig | undefined> {
    return this.config;
  }
}
