import { PhotosDataSource } from '../photos-service';
import * as pexels from 'pexels';
import { Photo } from '../../../../../common/dto/home-response';

/*
https://www.pexels.com/api/documentation/

{
 "width": 3024,
  "height": 3024,
  "url": "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
  "photographer": "Joey Farina",
  "photographer_url": "https://www.pexels.com/@joey",
  "photographer_id": 680589,
  "avg_color": "#978E82",
  "src": {
    "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
    "large2x": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "large": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
    "small": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
    "portrait": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    "landscape": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "tiny": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
  },
  "liked": false,
  "alt": "Brown Rocks During Golden Hour"
}
*/

export class PexelsService implements PhotosDataSource {
  private client: any;
  private mediaByCollectionId: any = {};

  constructor(apiKey: string) {
    this.client = pexels.createClient(apiKey);
  }

  public async getPhotosFromCollection(collectionId: string): Promise<Photo[]> {
    if (this.mediaByCollectionId[collectionId]) {
      return this.mediaByCollectionId[collectionId];
    }

    console.log('PexelsService: requesting photos');
    const response = await this.client.collections.media({
      id: collectionId,
      per_page: 50,
      type: 'photos'
    });

    if ((response as pexels.ErrorResponse).error) {
      console.log((response as pexels.ErrorResponse).error);
      return [];
    }

    const pexelPhotos = (response as any).media as pexels.Photo[];
    this.mediaByCollectionId[collectionId] = pexelPhotos.map((photo) => {
      return {
        url: photo.src.large2x,
        photographer: photo.photographer,
        title: photo.alt
      } as Photo;
    });

    return this.mediaByCollectionId[collectionId];
  }
}
