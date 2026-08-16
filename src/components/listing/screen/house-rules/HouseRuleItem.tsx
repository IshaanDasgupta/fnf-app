import React from "react";

import { ThemedIconText } from "@/src/components/themed-ui/ThemedIconText";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useResolveThemeColor } from "@/src/hooks/theme/useResolveThemeColor";
import { renderIcon } from "@/src/lib/utils/iconUtils";
import { sizes } from "@/src/theme/size";

interface HouseRuleItemProps {
  icon: React.ReactNode;
  label: string;
  desc?: string;
}

export default function HouseRuleItem({
  icon,
  label,
  desc,
}: HouseRuleItemProps) {
  const resolvedIconColor = useResolveThemeColor("foreground.primary");

  return (
    <ThemedView
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
      }}
      gap="md"
    >
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

      <ThemedView gap="xs" style={{ flex: 1 }}>
        <ThemedIconText
          icon={null}
          label={label}
          variant="body"
          labelColor="foreground.primary"
        />

        {desc && (
          <ThemedText variant="caption" color="foreground.secondary">
            {desc}
          </ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );
}
