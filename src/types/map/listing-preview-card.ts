import {
  BhkType,
  FurnishedStatus,
  GenderPreference,
  RentalScopeType,
} from "@/src/constants/api-constants";

export interface ListingPreviewCardProps {
  listingId: string;
  image: string;
  location: string;
  bhk: BhkType;
  capacity: number;
  rentalType: RentalScopeType;
  furnishedStatus: FurnishedStatus;

  genderPreference?: GenderPreference;
  rent: number;
  favourite: boolean;
}
