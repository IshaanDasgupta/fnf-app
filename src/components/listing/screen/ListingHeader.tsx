import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

import { ListingResponse } from "@/src/api/listing";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedIconText } from "@/src/components/themed-ui/ThemedIconText";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { sizes } from "@/src/theme/size";
import { formatOccupancy, formatRentalType } from "@/src/utils/occupancy";

interface ListingHeaderProps {
  bhk: ListingResponse["bhk"];
  locality: string;
  address: string;
  city: ListingResponse["address"]["city"];

  occupancy: ListingResponse["rentalScope"]["capacity"];
  rentalType: ListingResponse["rentalScope"]["type"];
  genderPreference: ListingResponse["genderPreference"];
  floor?: number;
  furnishedStatus: ListingResponse["furnishedStatus"];
  carpetArea?: number;
  totalOccupancy?: number;
  attachedWashroom?: boolean;

  availableImmediately: boolean;
  availableFrom?: string;
}

function formatLabel(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatBhk(bhk: string) {
  return bhk.replace(/^(\d+)(.*)$/, "$1 $2").trim();
}

function formatGenderPreference(gender: string) {
  return `${formatLabel(gender)} Preferred`;
}

function formatArea(area?: number) {
  return area ? `${area.toLocaleString("en-IN")} sq.ft` : undefined;
}

function formatAvailability(
  availableImmediately: boolean,
  availableFrom?: string,
) {
  if (availableImmediately) {
    return "Available Immediately";
  }

  if (!availableFrom) {
    return undefined;
  }

  return new Date(availableFrom).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

interface DetailProps {
  label: string;
  value: string;
}

function Detail({ label, value }: DetailProps) {
  return (
    <ThemedView style={styles.detail}>
      <ThemedText
        variant="bodySmall"
        color="foreground.tertiary"
        style={styles.detailLabel}
      >
        {label.toUpperCase()}
      </ThemedText>

      <ThemedText variant="title" style={styles.detailValue}>
        {value}
      </ThemedText>
    </ThemedView>
  );
}

export default function ListingHeader({
  bhk,
  locality,
  address,
  city,
  occupancy,
  rentalType,
  genderPreference,
  floor,
  furnishedStatus,
  carpetArea,
  totalOccupancy,
  attachedWashroom,
  availableImmediately,
  availableFrom,
}: ListingHeaderProps) {
  const details = [
    {
      label: "Unit",
      value: formatBhk(bhk),
    },
    {
      label: "Occupancy",
      value: formatOccupancy(occupancy),
    },
    {
      label: "Area",
      value: formatArea(carpetArea),
    },
    {
      label: "Floor",
      value: floor !== undefined ? `${floor}th` : undefined,
    },
    {
      label: "Furnishing",
      value: formatLabel(furnishedStatus),
    },
    {
      label: "Preference",
      value: genderPreference
        ? formatGenderPreference(genderPreference)
        : undefined,
    },
    {
      label: "Total Occupancy",
      value: totalOccupancy !== undefined ? `${totalOccupancy}` : undefined,
    },
    {
      label: "Washroom",
      value:
        attachedWashroom === undefined
          ? undefined
          : attachedWashroom
            ? "Attached"
            : "Shared",
    },
  ].filter(
    (detail): detail is { label: string; value: string } =>
      detail.value !== undefined && detail.value !== "",
  );

  const detailRows = [];

  for (let i = 0; i < details.length; i += 2) {
    detailRows.push(details.slice(i, i + 2));
  }

  const availability = formatAvailability(availableImmediately, availableFrom);

  return (
    <ThemedView>
      <ThemedText variant="display">
        {`${formatOccupancy(occupancy)} ${formatRentalType(rentalType)}`}
      </ThemedText>

      <Spacer size="xs" />

      <ThemedIconText
        icon={<Ionicons name="location-outline" size={18} />}
        iconColor="accent.primary"
        label={address}
        labelColor="foreground.secondary"
        variant="body"
      />

      <Spacer size="xl" />

      <ThemedView gap="lg">
        {detailRows.map((row, rowIndex) => (
          <ThemedView key={rowIndex} style={styles.detailRow}>
            {row.map((detail) => (
              <Detail
                key={detail.label}
                label={detail.label}
                value={detail.value}
              />
            ))}

            {row.length < 2 &&
              Array.from({ length: 2 - row.length }).map((_, index) => (
                <ThemedView key={`empty-${index}`} style={styles.detail} />
              ))}
          </ThemedView>
        ))}
      </ThemedView>

      <Spacer size="md" />
      <ThemedView variant="tertiary" style={styles.divider} />
      <Spacer size="md" />

      {availability && (
        <ThemedView style={styles.availability}>
          <ThemedText variant="body" color="foreground.secondary">
            Availability
          </ThemedText>

          <ThemedIconText
            icon={<Ionicons name="ellipse" size={12} />}
            iconColor="accent.green"
            label={availability}
            labelColor="accent.green"
            variant="body"
          />
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 2,
  },

  detailRow: {
    flexDirection: "row",
    gap: sizes.md,
  },

  detail: {
    flex: 1,
    minWidth: 0,
  },

  detailLabel: {
    letterSpacing: 0.5,
  },

  detailValue: {
    fontWeight: "600",
  },

  availability: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "transparent",
  },
});
