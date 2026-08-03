import React from "react";

import { ThemedIconText } from "@/components/themed-ui/ThemedIconText";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { sizes } from "@/theme/size";
import { useResolveThemeColor } from "@/hooks/useResolveThemeColor";
import { renderIcon } from "@/utils/iconUtils";

interface HouseRuleItemProps {
  icon: React.ReactNode;
  label: string;
}

export default function HouseRuleItem({ icon, label }: HouseRuleItemProps) {
  const resolvedIconColor = useResolveThemeColor("foreground.primary");

  return (
    <ThemedView style={{ flexDirection: "row", alignItems: "center" }} gap="md">
      <ThemedView
        variant="tertiary"
        style={{
          width: sizes["4xl"],
          height: sizes["4xl"],
          alignItems: "center",
          justifyContent: "center",
        }}
        borderRadius="button"
      >
        {renderIcon(icon, resolvedIconColor)}
      </ThemedView>

      <ThemedIconText
        icon={null}
        label={label}
        variant="body"
        labelColor="foreground.primary"
      />
    </ThemedView>
  );
}
