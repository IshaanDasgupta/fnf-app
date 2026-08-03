import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { ThemedChip } from "@/components/themed-ui/ThemedChip";
import { ThemedIconText } from "@/components/themed-ui/ThemedIconText";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

export default function ListingHeader() {
  return (
    <ThemedView gap="lg">
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <ThemedChip
          variant="tertiary"
          label="Verified home"
          labelVariant="body"
          leftIcon={<Ionicons name="shield-checkmark" size={14} />}
        />

        {/* Can later be replaced with a MatchBadge */}
      </ThemedView>

      <ThemedText variant="display" style={{ textOverflow: "warp" }}>
        Sunlit Loft near Indiranagar
      </ThemedText>

      <ThemedIconText
        icon={<Ionicons name="location-outline" size={16} />}
        iconColor="foreground.secondary"
        label="Indiranagar, Bengaluru"
        labelColor="foreground.secondary"
        variant="body"
      />
    </ThemedView>
  );
}
