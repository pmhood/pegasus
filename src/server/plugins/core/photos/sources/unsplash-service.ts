import * as unsplashJs from 'unsplash-js';
import { EnvironmentVar, getEnvVar } from '../../../../config/environment-var';

export class UnsplashService {
  private readonly unsplashApi: any;

  constructor() {
    const key = getEnvVar(EnvironmentVar.UnsplashAccessKey);
    if (key) {
      this.unsplashApi = unsplashJs.createApi({
        accessKey: key
      });
    } else {
      console.warn('No API key for Unsplash');
    }
  }

  public async getRandomPhoto(): Promise<any> {
    const result = await this.unsplashApi.photos.getRandom({
      count: 1,
      contentFilter: 'high',
      // topicIds: ['nature'],
      // query: 'weather',
      collectionIds: ['162468']
      // orientation: 'landscape'
    });
    return result;
    // console.log(result);
    // if (result.errors) {
    //   // handle error here
    //   console.log('error occurred: ', result.errors[0]);
    //   res.sendStatus(500);
    // } else {
    //   // handle success here
    //   const photos = result.response as Random[];
    //   res.send({
    //     url: photos[0].urls.thumb
    //   });
    //   unsplash.photos.trackDownload({
    //     downloadLocation: photos[0].links.download_location
    //   });
    // }
  }
}
