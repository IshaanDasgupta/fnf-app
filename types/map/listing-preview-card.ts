export interface ListingPreviewCardProps {
  image: string;

  match?: number;

  title: string;
  location: string;

  bedrooms: number;
  flatmates: number;

  rent: number;

  liked?: boolean;

  onPress?(): void;

  onMessage?(): void;

  onFavourite?(): void;
}
