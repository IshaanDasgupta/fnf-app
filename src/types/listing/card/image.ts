import { OccupancyType } from "@/src/constants/api-constants";

export interface ListingImageProps {
  source?: string;
  favourite: boolean;
  listingId: string;
  occupancy?: OccupancyType;
}
