export class CacheService {
  private data: any = {};

  public async get(id: string): Promise<any | undefined> {
    return this.data[id];
  }

  public async set(id: string, value: any, expiry?: Date) {
    this.data[id] = value;
  }
}
