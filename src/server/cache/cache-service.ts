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
      console.log(`Cache hit for ${id}.  Expiry is ${expiryDate}`);
      return this.data[id];
    }
  }

  public async set(id: string, value: any, ttl?: number) {
    if (!ttl) {
      ttl = 0;
    }

    const expiryDate = moment().add(ttl, 'ms');

    console.log(`Cache set for ${id}, expiry at ${expiryDate}`);
    delete this.expiry[id];
    this.expiry[id] = expiryDate;

    this.data[id] = value;
  }
}
