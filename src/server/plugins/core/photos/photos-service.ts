// import { PexelsService } from '../../../services/photos/sources/pexels-service';

import { EnvironmentVar, getEnvVar } from '../../../config/environment-var';
import { PexelsService } from './sources/pexels-service';

export class PhotosService {
  private pexelsService: PhotosDataSource | undefined;

  // constructor(private readonly dataSources: any) {
  constructor() {
    const apiKey = getEnvVar(EnvironmentVar.PexelsApiKey);
    if (apiKey) {
      this.pexelsService = new PexelsService(apiKey);
    }
  }

  public async getPhoto(): Promise<Photo[]> {
    const photos = (await this.pexelsService?.getPhotos()) ?? [];
    return photos;
  }
}

export interface PhotosDataSource {
  getPhotos(): Promise<Photo[]>;
}

export interface Photo {
  url: string;
  photographer?: string;
  title?: string;
  description?: string;
  location?: string;
}
