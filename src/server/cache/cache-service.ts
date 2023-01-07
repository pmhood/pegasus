import * as moment from 'moment';

export class CacheService {
  private data: { [id: string]: any } = {};
  private expiry: { [id: string]: moment.Moment | undefined } = {};

  public async get(id: string): Promise<any | undefined> {
    const expiryDate = this.expiry[id];
    const cacheData = this.data[id];

    if (expiryDate && expiryDate < moment()) {
      console.log(`Cache expired for ${id}: ${expiryDate}`);
      delete this.expiry[id];
    } else if (cacheData) {
      console.log(`Cache hit for ${id}`);
      return this.data[id];
    }
  }

  public async set(id: string, value: any, expiry?: moment.Moment) {
    console.log(`Cache set for ${id}, expiry at ${expiry}`);
    if (expiry) {
      this.expiry[id] = moment(expiry);
    } else {
      delete this.expiry[id];
    }
    this.data[id] = value;
  }
}
