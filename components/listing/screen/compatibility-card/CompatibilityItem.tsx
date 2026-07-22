import React from "react";

import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

interface CompatibilityItemProps {
  title: string;
  value: string;
}

export default function CompatibilityItem({
  title,
  value,
}: CompatibilityItemProps) {
  return (
    <ThemedView
      flex={1}
      variant="secondary"
      borderRadius="button"
      padding="lg"
      alignItems="center"
      justifyContent="center"
      gap="xs"
    >
      <ThemedText variant="caption" color="text.secondary">
        {title}
      </ThemedText>

      <ThemedText variant="label" align="center">
        {value}
      </ThemedText>
    </ThemedView>
  );
}
