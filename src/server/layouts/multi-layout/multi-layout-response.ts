export interface LayoutResponse {
  layout: string;
}
export interface MultiLayoutResponse extends LayoutResponse {
  left: any;
  rightTop: any;
  rightBottomLeft: any;
  rightBottomRight: any;
}
