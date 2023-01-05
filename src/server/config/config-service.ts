import { PegasusConfig } from './pegasus-config';
import * as fs from 'fs';
import { EnvironmentVar, getEnvVar } from './environment-var';

export class ConfigService {
  private config: PegasusConfig;

  public loadConfig() {
    const filepath = getEnvVar(EnvironmentVar.PegasusConfigFile);
    if (!filepath) {
      throw new Error('no config file found');
    }

    console.log(`Config filepath: ${filepath}`);

    this.config = JSON.parse(
      fs.readFileSync(filepath, 'utf8')
    ) as PegasusConfig;
  }

  public getConfig(): PegasusConfig {
    this.loadConfig();
    return this.config;
  }
}

const pkg = require('../../package.json');
export const Version = pkg.version;
