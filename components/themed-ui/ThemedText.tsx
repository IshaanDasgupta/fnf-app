import React from "react";
import { Text, TextStyle } from "react-native";

import { useColors } from "@/hooks/useColors";
import { typography } from "@/theme/typography";
import { ThemedTextProps } from "@/types/ui/themed-text";
import { resolveThemeColor } from "@/utils/resolve-theme-color";

export function ThemedText({
  variant = "body",
  color = "text.primary",
  align = "left",
  style,
  children,
  ...rest
}: ThemedTextProps) {
  const colors = useColors();

  const textStyle: TextStyle = {
    ...(typography[variant] as TextStyle),
    color: resolveThemeColor(colors, color),
    textAlign: align,
  };

  return (
    <Text style={[textStyle, style]} {...rest}>
      {children}
    </Text>
  );
}

export default ThemedText;
