import React from "react";
import { Image } from "react-native";

import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

interface OwnerCardProps {
  name: string;
  age?: number;
  image?: string;
}

export default function OwnerCard({ name, age, image }: OwnerCardProps) {
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
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
            }}
          />
        )}

        <ThemedView gap="xs">
          <ThemedText variant="label">
            {name}
            {age !== undefined ? `, ${age}` : ""}
          </ThemedText>

          <ThemedText variant="caption" color="foreground.secondary">
            Listing owner
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
