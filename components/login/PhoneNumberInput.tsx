import React from "react";
import { TextInput } from "react-native";

import { ThemedView } from "@/components/themed-ui/ThemedView";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import ThemedTextInput from "@/components/themed-ui/ThemedTextInput";

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
        labelVariant="h1"
        value={value}
        onChangeText={onChangeText}
        keyboardType="phone-pad"
        placeholder="+91 98765 43210"
        autoComplete="tel"
        textContentType="telephoneNumber"
        inputTypography="h2"
        maxLength={10}
      />
    </ThemedView>
  );
}
