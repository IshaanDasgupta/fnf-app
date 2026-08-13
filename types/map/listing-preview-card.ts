import { BhkType, OccupancyType } from "@/constants/api-constants";

export interface ListingPreviewCardProps {
  listingId: string;
  image: string;
  title: string;
  location: string;
  bhk: BhkType;
  occupancy: OccupancyType;
  rent: number;
  favourite: boolean;
}
