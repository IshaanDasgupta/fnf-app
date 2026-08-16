import React from "react";

import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { NearbyChipProps } from "@/src/types/listing/screen/neighborhood";

export default function NearbyChip({ title, value }: NearbyChipProps) {
  return (
    <ThemedView
      variant="tertiary"
      borderRadius="button"
      padding="lg"
      style={{ flex: 1 }}
    >
      <ThemedText variant="caption" color="foreground.secondary">
        {title}
      </ThemedText>

      <ThemedText variant="label">{value}</ThemedText>
    </ThemedView>
  );
}
