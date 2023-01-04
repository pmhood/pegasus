import { LayoutResponse } from './multi-layout/multi-layout-response';

export interface Layout {
  getResponseData(): Promise<LayoutResponse>;
}
