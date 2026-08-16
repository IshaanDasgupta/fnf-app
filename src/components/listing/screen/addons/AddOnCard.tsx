import React from "react";

import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useResolveThemeColor } from "@/src/hooks/theme/useResolveThemeColor";
import { renderIcon } from "@/src/lib/utils/iconUtils";

interface AddOnCardProps {
  icon: React.ReactNode;
  label: string;
  desc?: string;
}

export default function AddOnCard({ icon, label, desc }: AddOnCardProps) {
  const accentPrimary = useResolveThemeColor("accent.primary");

  return (
    <ThemedView
      variant="tertiary"
      borderRadius="card"
      padding="2xl"
      style={{
        width: "48%",
        justifyContent: "center",
      }}
    >
      <ThemedView
        style={{ flexDirection: "row", alignItems: "center" }}
        gap="sm"
      >
        {renderIcon(icon, accentPrimary)}
        <ThemedView
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <ThemedText color="foreground.primary">{label}</ThemedText>
          {desc?.trim() ? (
            <ThemedText
              variant="caption"
              color="foreground.secondary"
              style={{ marginTop: 4 }}
            >
              {desc}
            </ThemedText>
          ) : null}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
