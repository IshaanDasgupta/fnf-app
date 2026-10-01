import React from "react";

import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useResolveThemeColor } from "@/src/hooks/theme/useResolveThemeColor";
import { renderIcon } from "@/src/lib/utils/iconUtils";

interface ServiceCardProps {
  icon: React.ReactNode;
  label: string;
  desc?: string;
  price?: number;
  included: boolean;
}

export default function ServiceCard({
  icon,
  label,
  desc,
  price,
  included,
}: ServiceCardProps) {
  const foregroundSecondary = useResolveThemeColor("foreground.secondary");

  return (
    <ThemedView
      variant="secondary"
      borderRadius="card"
      style={{
        width: "48%",
      }}
      padding="lg"
      shadow="md"
    >
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        gap="sm"
      >
        <ThemedView variant="tertiary" padding="md" borderRadius="button">
          {renderIcon(icon, foregroundSecondary)}
        </ThemedView>

        <ThemedView style={{ flex: 1, minWidth: 0 }}>
          <ThemedText
            color="foreground.primary"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {label}
          </ThemedText>

          {desc?.trim() ? (
            <ThemedText
              variant="caption"
              color="foreground.secondary"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ marginTop: 4 }}
            >
              {desc}
            </ThemedText>
          ) : null}
        </ThemedView>
      </ThemedView>
      <Spacer size="md" />
      <ThemedView
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {price !== undefined ? (
          <ThemedText
            variant="title"
            color="foreground.primary"
            numberOfLines={1}
          >
            ₹{price.toLocaleString("en-IN")}
          </ThemedText>
        ) : null}

        <ThemedText
          variant="caption"
          color={included ? "accent.green" : "foreground.secondary"}
          style={{ marginTop: 2 }}
        >
          {included ? "Included in Rent" : "Excluded from Rent"}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
