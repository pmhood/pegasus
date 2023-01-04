import { Layout } from './layout';
import { MultiLayout } from './multi-layout/multi-layout';

export class LayoutFactory {
  public static make(layoutData: LayoutData): Layout | undefined {
    switch (layoutData.layoutId) {
      case MultiLayout.id:
        return new MultiLayout(layoutData.settings);
    }
  }
}

export interface LayoutData {
  layoutId: string;
  settings: any;
}
