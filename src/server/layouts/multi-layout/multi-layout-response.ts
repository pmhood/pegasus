import { LayoutResponse } from '../layout-response';

export interface MultiLayoutResponse extends LayoutResponse {
  left: any;
  rightTop: any;
  rightBottomLeft: any;
  rightBottomRight: any;
}
