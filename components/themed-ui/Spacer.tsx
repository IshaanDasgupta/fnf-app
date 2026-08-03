import React from "react";
import { View } from "react-native";

import { SpacerProps } from "@/types/ui/spacer";
import { sizes } from "@/theme/size";

function resolveSpacing(value: keyof typeof sizes | number = "md"): number {
  if (typeof value === "number") {
    return value;
  }

  return sizes[value];
}

export function Spacer({ size = "md", horizontal = false }: SpacerProps) {
  const value = resolveSpacing(size);

  return (
    <View
      pointerEvents="none"
      style={
        horizontal
          ? {
              width: value,
            }
          : {
              height: value,
            }
      }
    />
  );
}

export default Spacer;
