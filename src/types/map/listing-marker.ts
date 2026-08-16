export interface ListingMarkerProps {
  id: string;

  latitude: number;
  longitude: number;

  price: number;

  selected?: boolean;

  onPress(id: string): void;
}
