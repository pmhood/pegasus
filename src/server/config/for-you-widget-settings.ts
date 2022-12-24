export interface ForYouWidgetSettings {
  photo: PhotoSettings;
}

export interface PhotoSettings {
  source: PhotoSource;
  settings: PexelsPhotoSourceSettings;
}

export enum PhotoSource {
  Pexels = 'pexels',
  Unsplash = 'unsplash'
}

export interface PexelsPhotoSourceSettings {
  collectionId: string;
}
