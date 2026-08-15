import { Ionicons } from "@expo/vector-icons";
import React from "react";

import HouseRuleItem from "@/components/listing/screen/house-rules/HouseRuleItem";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { HouseRuleType } from "@/constants/api-constants";

interface HouseRule {
  type: HouseRuleType;
  desc?: string;
}

interface HouseRulesSectionProps {
  houseRules: HouseRule[];
}

const houseRuleIcons: Record<HouseRuleType, keyof typeof Ionicons.glyphMap> = {
  "No Smoking": "ban-outline",
  "No Alcohol": "wine-outline",

  "Vegetarian Only": "leaf-outline",
  "Non-Vegetarian Allowed": "restaurant-outline",
  "No Cooking": "restaurant-outline",

  "Guests Allowed": "people-outline",
  "No Overnight Guests": "moon-outline",
  "No Parties": "ban-outline",

  "No Pets": "paw-outline",
  "Pets Allowed": "paw-outline",

  "No Loud Music": "volume-mute-outline",
  "No Loud Noise": "volume-mute-outline",
  "No Subletting": "home-outline",

  "Couples Only": "people-outline",
  "Students Only": "school-outline",
  "Working Professionals Only": "briefcase-outline",

  Others: "information-circle-outline",
};

export default function HouseRulesSection({
  houseRules,
}: HouseRulesSectionProps) {
  return (
    <ThemedView gap="lg">
      <ThemedText variant="h2">House rules</ThemedText>

      <ThemedView gap="lg">
        {houseRules.map((rule, index) => (
          <HouseRuleItem
            key={`${rule.type}-${index}`}
            icon={<Ionicons name={houseRuleIcons[rule.type]} size={22} />}
            label={rule.type === "Others" ? (rule.desc ?? "Other") : rule.type}
            desc={rule.type === "Others" ? undefined : rule.desc}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}
