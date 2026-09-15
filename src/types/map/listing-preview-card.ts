import {
  BhkType,
  FurnishedStatus,
  GenderPreference,
  OccupancyType,
} from "@/src/constants/api-constants";

export interface ListingPreviewCardProps {
  listingId: string;
  image: string;
  location: string;
  bhk: BhkType;
  occupancy: OccupancyType;
  totalOccupancy?: number;
  furnishedStatus: FurnishedStatus;

  genderPreference: GenderPreference;
  rent: number;
  favourite: boolean;
}
