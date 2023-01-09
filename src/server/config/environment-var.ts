export enum EnvironmentVar {
  Enviroment = 'ENVIRONMENT',
  PegasusConfigFile = 'PEGASUS_CONFIG_FILE',
  PexelsApiKey = 'PEXELS_API_KEY',
  TodoistApiToken = 'TODOIST_API_TOKEN',
  UnsplashAccessKey = 'UNSPLASH_ACCESS_KEY'
}

export function getEnvVar(envVar: EnvironmentVar): string | undefined {
  return process.env[envVar];
}

export enum Environment {
  Prod = 'prod'
}
