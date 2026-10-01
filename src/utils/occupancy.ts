import type { CapacityFilter } from "@/src/api/listing";
import { RentalScopeType } from "@/src/constants/api-constants";

export function formatOccupancy(occupancy: CapacityFilter | number | string) {
  const normalized =
    typeof occupancy === "number"
      ? String(occupancy)
      : occupancy.trim().toLowerCase();

  if (normalized === "1") return "Single";
  if (normalized === "2") return "Double";
  if (normalized === "3" || normalized === "3plus" || normalized === "3+")
    return "Triple";
  return `${occupancy} Shared`;
}

export function formatRentalType(type: RentalScopeType) {
  if (type === "room") return "Room";
  if (type === "hall") return "Hall";
}
