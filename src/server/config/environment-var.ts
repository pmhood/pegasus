export enum EnvironmentVar {
  PegasusConfigFile = 'PEGASUS_CONFIG_FILE',
  PexelsApiKey = 'PEXELS_API_KEY',
  UnsplashAccessKey = 'UNSPLASH_ACCESS_KEY'
}

export function getEnvVar(EnvironemntVar): string | undefined {
  return process.env[EnvironemntVar];
}
