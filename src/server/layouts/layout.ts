import { LayoutResponse } from './layout-response';

export interface Layout {
  getResponseData(): Promise<LayoutResponse>;
}
