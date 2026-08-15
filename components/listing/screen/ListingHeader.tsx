import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { ThemedChip } from "@/components/themed-ui/ThemedChip";
import { ThemedIconText } from "@/components/themed-ui/ThemedIconText";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

interface ListingHeaderProps {
  title: string;
  locality: string;
  city: string;
}

export default function ListingHeader({
  title,
  locality,
  city,
}: ListingHeaderProps) {
  return (
    <ThemedView gap="lg">
      <ThemedView style={styles.topRow}>
        <ThemedChip
          variant="tertiary"
          label="Verified home"
          labelVariant="body"
          leftIcon={<Ionicons name="shield-checkmark" size={14} />}
        />
      </ThemedView>

      <ThemedText variant="display">{title}</ThemedText>

      <ThemedIconText
        icon={<Ionicons name="location-outline" size={16} />}
        iconColor="foreground.secondary"
        label={`${locality}, ${city}`}
        labelColor="foreground.secondary"
        variant="body"
      />
    </ThemedView>
  );
}

const styles = {
  topRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "flex-start" as const,
  },
};
