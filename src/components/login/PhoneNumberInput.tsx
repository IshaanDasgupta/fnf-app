import React from "react";

import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedTextInput } from "@/src/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

interface Props {
  value: string;
  onChangeText(text: string): void;
}

export function PhoneNumberInput({ value, onChangeText }: Props) {
  return (
    <ThemedView variant="secondary" borderRadius="card" padding="lg">
      <ThemedText variant="h3" color="foreground.secondary">
        Phone Number
      </ThemedText>

      <ThemedView
        style={{ flexDirection: "row", alignItems: "center" }}
        gap="xs"
      >
        <ThemedView variant="inverse" padding="sm" borderRadius="xs">
          <ThemedText variant="h3" color="foreground.inverse">
            +91
          </ThemedText>
        </ThemedView>

        <ThemedTextInput
          variant="ghost"
          value={value}
          onChangeText={onChangeText}
          keyboardType="phone-pad"
          placeholder="98765 43210"
          autoComplete="tel"
          textContentType="telephoneNumber"
          textVariant="display"
          maxLength={10}
        />
      </ThemedView>
    </ThemedView>
  );
}
