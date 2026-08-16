import React from "react";
import { View } from "react-native";

import { sizes } from "@/src/theme/size";
import { SpacerProps } from "@/src/types/ui/spacer";

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
