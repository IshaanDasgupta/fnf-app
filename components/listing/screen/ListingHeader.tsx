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
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <ThemedChip
          variant="primary"
          label="Verified home"
          leftIcon={<Ionicons name="shield-checkmark" size={14} />}
        />

        {/* Can later be replaced with a MatchBadge */}
      </ThemedView>

      <ThemedText variant="display">
        Sunlit Loft near{"\n"}Indiranagar
      </ThemedText>

      <ThemedIconText
        icon={<Ionicons name="location-outline" size={16} />}
        text="Indiranagar, Bengaluru · 8 min walk to metro"
        color="text.secondary"
        variant="body"
      />
    </ThemedView>
  );
}
