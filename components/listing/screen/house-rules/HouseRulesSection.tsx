import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import HouseRuleItem from "@/components/listing/screen/house-rules/HouseRuleItem";

export default function HouseRulesSection() {
  return (
    <ThemedView gap="lg">
      <ThemedText variant="title">House rules</ThemedText>

      <ThemedView gap="lg">
        <HouseRuleItem
          icon={<Ionicons name="ban-outline" size={18} />}
          label="Non-smoking home"
        />

        <HouseRuleItem
          icon={<Ionicons name="paw-outline" size={18} />}
          label="Pets welcome"
        />
      </ThemedView>
    </ThemedView>
  );
}
