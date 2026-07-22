import React from "react";

import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { NearbyChipProps } from "@/types/listing/screen/neighborhood";
import { spacing } from "@/theme/spacing";

export default function NearbyChip({ title, value }: NearbyChipProps) {
  return (
    <ThemedView
      variant="tertiary"
      borderRadius="button"
      padding={spacing.lg}
      flex={1}
    >
      <ThemedText variant="caption" color="text.secondary">
        {title}
      </ThemedText>

      <ThemedText variant="label">{value}</ThemedText>
    </ThemedView>
  );
}
