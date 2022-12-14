import { PexelsService } from './sources/pexels-service';

export class PhotosService {
  private pexelsService: PhotosDataSource;

  // constructor(private readonly dataSources: any) {
  constructor() {
    this.pexelsService = new PexelsService(
      process.env['PEXELS_API_KEY'] as string
    );
  }

  public async getPhoto(): Promise<Photo[]> {
    const photos = await this.pexelsService.getPhotos();
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
