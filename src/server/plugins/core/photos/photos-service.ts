import { Photo } from '../../../../common/dto/home-response';
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

  public async getPhotosFromCollection(collectionId: string): Promise<Photo[]> {
    const photos =
      (await this.pexelsService?.getPhotosFromCollection(collectionId)) ?? [];

    return photos;
  }
}

export interface PhotosDataSource {
  getPhotosFromCollection(collectionId: string): Promise<Photo[]>;
}
