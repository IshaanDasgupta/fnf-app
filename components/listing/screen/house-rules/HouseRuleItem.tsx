import React from "react";

import { ThemedIconText } from "@/components/themed-ui/ThemedIconText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

interface HouseRuleItemProps {
  icon: React.ReactNode;
  label: string;
}

export default function HouseRuleItem({ icon, label }: HouseRuleItemProps) {
  return (
    <ThemedView flexDirection="row" alignItems="center" gap="md">
      <ThemedView
        variant="secondary"
        style={{
          width: 36,
          height: 36,
        }}
        borderRadius="button"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </ThemedView>

      <ThemedIconText
        icon={null}
        text={label}
        variant="body"
        color="text.primary"
      />
    </ThemedView>
  );
}
