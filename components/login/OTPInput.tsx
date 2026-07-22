import React from "react";
import { TextInput } from "react-native";

import { ThemedView } from "@/components/themed-ui/ThemedView";
import ThemedTextInput from "@/components/themed-ui/ThemedTextInput";

interface Props {
  value: string;
  onChange(value: string): void;
}

export function OTPInput({ value, onChange }: Props) {
  return (
    <ThemedView flexDirection="row" justifyContent="space-between">
      <ThemedTextInput
        variant="ghost"
        value={value}
        onChangeText={onChange}
        keyboardType="number-pad"
        maxLength={6}
        autoFocus
        inputTypography="h1"
        textAlign="center"
        inputStyle={{
          letterSpacing: 20,
        }}
        placeholder="XXXXXX"
      />
    </ThemedView>
  );
}
