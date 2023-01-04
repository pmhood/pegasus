import { PhotoItem } from '../../../../common/dto/photo-item';

export interface PhotoSource {
  fetchItems(settings: any): Promise<PhotoItem[]>;
}
