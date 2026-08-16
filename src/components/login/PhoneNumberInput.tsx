import React from "react";

import { ThemedTextInput } from "@/src/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

interface Props {
  value: string;
  onChangeText(text: string): void;
}

export function PhoneNumberInput({ value, onChangeText }: Props) {
  return (
    <ThemedView variant="secondary" borderRadius="card" padding="lg">
      <ThemedTextInput
        variant="ghost"
        label="Phone Number"
        labelVariant="h3"
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
  );
}
