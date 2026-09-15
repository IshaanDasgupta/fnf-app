import React from "react";

import { ThemedIconText } from "@/src/components/themed-ui/ThemedIconText";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useResolveThemeColor } from "@/src/hooks/theme/useResolveThemeColor";
import { renderIcon } from "@/src/lib/utils/iconUtils";

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
        alignItems: "center",
      }}
      gap="md"
    >
      {renderIcon(icon, resolvedIconColor)}

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
