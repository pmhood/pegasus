import * as axios from 'axios';

export class FooService {
  public bar(): string {
    return 'bar';
  }

  public async getTest(): Promise<string> {
    const response = await axios.default.get('/api/healthcheck');
    return response.data;
  }
  public async getPhotos(): Promise<any> {
    const response = await axios.default.get('/api/photos');
    return response.data.results[0].urls.small;
  }

  public async getRandomPhoto(): Promise<string> {
    const response = await axios.default.get('/api/photos/random');
    return response.data.url;
  }
}
