import React from "react";
import { Image } from "react-native";

import { ThemedButton } from "@/components/themed-ui/ThemedButton";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { sizes } from "@/theme/size";

interface OwnerCardProps {
  image: string;
  name: string;
  age: number;
  subtitle: string;
}

export default function OwnerCard({
  image,
  name,
  age,
  subtitle,
}: OwnerCardProps) {
  return (
    <ThemedView
      variant="tertiary"
      borderRadius="card"
      padding="md"
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        gap="md"
      >
        <Image
          source={{ uri: image }}
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
          }}
        />

        <ThemedView gap="xs">
          <ThemedText variant="label">
            {name}, {age}
          </ThemedText>

          <ThemedText variant="caption" color="foreground.secondary">
            {subtitle}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedButton
        variant="secondary"
        style={{
          width: "auto",
          paddingHorizontal: sizes.md,
          paddingVertical: sizes.sm,
        }}
        label="Say Hi!"
      />
    </ThemedView>
  );
}
