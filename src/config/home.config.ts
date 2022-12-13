export interface PegasusConfig {
  home: HomeWidget[];
}
export interface HomeWidget {
  componentName: string;
}

export const pegasusConfig: PegasusConfig = {
  home: [
    {
      componentName: 'LoremIpsum'
    },
    {
      componentName: 'LoremIpsum'
    },
    {
      componentName: 'LoremIpsum'
    },
    {
      componentName: 'LoremIpsum'
    }
  ]
};
