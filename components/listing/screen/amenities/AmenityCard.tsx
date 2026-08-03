import React from "react";

import { ThemedIconText } from "@/components/themed-ui/ThemedIconText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

interface AmenityCardProps {
  icon: React.ReactNode;
  label: string;
}

export default function AmenityCard({ icon, label }: AmenityCardProps) {
  return (
    <ThemedView
      variant="tertiary"
      borderRadius="card"
      padding="2xl"
      style={{ width: "48%" }}
    >
      <ThemedIconText
        icon={icon}
        iconColor="accent.primary"
        label={label}
        labelColor="foreground.primary"
        gap="sm"
        style={{}}
      />
    </ThemedView>
  );
}
