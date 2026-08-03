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
      variant="secondary"
      borderRadius="button"
      padding="md"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      gap="xs"
    >
      <ThemedText variant="caption" color="foreground.secondary">
        {title}
      </ThemedText>

      <ThemedText variant="label" style={{ textAlign: "center" }}>
        {value}
      </ThemedText>
    </ThemedView>
  );
}
