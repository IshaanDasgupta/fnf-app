import React from "react";

import CompatibilityItem from "./CompatibilityItem";

// import { ThemedProgressBar } from "@/components/themed-ui/ThemedProgressBar";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

export default function CompatibilityCard() {
  return (
    <ThemedView variant="tertiary" borderRadius="card" padding="xl" gap="lg">
      <ThemedView
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ThemedText variant="title">Compatibility</ThemedText>

        <ThemedText variant="title" color="primary">
          94% match
        </ThemedText>
      </ThemedView>

      {/* <ThemedProgressBar value={0.94} variant="primary" /> */}

      <ThemedView flexDirection="row" justifyContent="space-between" gap="md">
        <CompatibilityItem title="Sleep" value="Aligned" />

        <CompatibilityItem title="Cleanliness" value="Aligned" />

        <CompatibilityItem title="Social" value="Similar" />
      </ThemedView>
    </ThemedView>
  );
}
