import React from "react";

import CompatibilityItem from "./CompatibilityItem";

// import { ThemedProgressBar } from "@/components/themed-ui/ThemedProgressBar";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

export default function CompatibilityCard() {
  return (
    <ThemedView variant="tertiary" borderRadius="card" padding="xl" gap="lg">
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText variant="title">Compatibility</ThemedText>

        <ThemedText variant="title" color="accent.primary">
          94% match
        </ThemedText>
      </ThemedView>

      {/* <ThemedProgressBar value={0.94} variant="primary" /> */}

      <ThemedView
        gap="md"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CompatibilityItem title="Sleep" value="Aligned" />

        <CompatibilityItem title="Cleanliness" value="Aligned" />

        <CompatibilityItem title="Social" value="Similar" />
      </ThemedView>
    </ThemedView>
  );
}
