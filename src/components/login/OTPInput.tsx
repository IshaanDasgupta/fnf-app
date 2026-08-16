import React from "react";

import { ThemedTextInput } from "@/src/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

interface Props {
  value: string;
  onChange(value: string): void;
}

export function OTPInput({ value, onChange }: Props) {
  return (
    <ThemedView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <ThemedTextInput
        variant="ghost"
        value={value}
        onChangeText={onChange}
        keyboardType="number-pad"
        maxLength={6}
        autoFocus
        textVariant="h1"
        inputStyle={{
          letterSpacing: 20,
          textAlign: "center",
        }}
        placeholder="XXXXXX"
        containerStyle={{
          flex: 1,
          alignItems: "center",
        }}
      />
    </ThemedView>
  );
}
