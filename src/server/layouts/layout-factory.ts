import { Layout } from './layout';
import { MultiLayout } from './multi-layout/multi-layout';
import { SingleLayout } from './single-layout/single-layout';

export class LayoutFactory {
  public static make(layoutData: LayoutData): Layout | undefined {
    switch (layoutData.layoutId) {
      case MultiLayout.id:
        return new MultiLayout(layoutData.settings);
      case SingleLayout.id:
        return new SingleLayout(layoutData.settings);
    }

    console.error(`LayoutFactory: Cannot find layout '${layoutData.layoutId}'`);
  }
}

export interface LayoutData {
  layoutId: string;
  settings: any;
}
