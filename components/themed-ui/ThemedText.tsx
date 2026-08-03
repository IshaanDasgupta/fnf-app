import { Text, TextProps } from "react-native";

import { typography } from "@/theme/typography";
import { ThemedColorToken } from "@/types/theme-color";
import { useResolveThemeColor } from "@/hooks/useResolveThemeColor";
import { ThemedTextProps } from "@/types/ui/themed-text";

export function ThemedText({
  variant = "body",
  color = "foreground.primary",
  style,
  ...props
}: ThemedTextProps) {
  return (
    <Text
      {...props}
      style={[
        typography[variant],
        { color: useResolveThemeColor(color) },
        style,
      ]}
    />
  );
}
