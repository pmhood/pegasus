import { PluginData } from '../../../plugins/plugin-factory';

export interface CarouselWidgetSettings {
  transitionType: TransitionType;
  transitionTime: number;
  plugins: PluginData[];
}

export enum TransitionType {
  Fade = 'fade'
}
