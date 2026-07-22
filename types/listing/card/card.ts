export interface Listing {
  id: string;
  image: string;
  title: string;
  location: string;
  price: number;
  compatibility: number;
  verified?: boolean;
  favorite?: boolean;
  bedrooms: number;
  flatmates: number;
  availableDate: string;
  tags: string[];
}

export interface ListingCardProps {
  listing: Listing;
}
