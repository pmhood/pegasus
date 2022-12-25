import { PegasusConfig } from './pegasus-config';
import * as fs from 'fs';
import { EnvironmentVar, getEnvVar } from './environment-var';

export class ConfigService {
  private config: PegasusConfig;
  public readonly version: string;

  constructor() {
    const filepath = getEnvVar(EnvironmentVar.PegasusConfigFile);
    if (!filepath) {
      throw new Error('no config file found');
    }

    console.log(`Config filepath: ${filepath}`);

    this.config = JSON.parse(
      fs.readFileSync(filepath, 'utf8')
    ) as PegasusConfig;

    const pkg = require('../../package.json');
    this.version = pkg.version;
  }

  public async getConfig(): Promise<PegasusConfig> {
    return this.config;
  }
}
