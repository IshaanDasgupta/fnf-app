import { Text } from "react-native";

import { useResolveThemeColor } from "@/src/hooks/theme/useResolveThemeColor";
import { typography } from "@/src/theme/typography";
import { ThemedTextProps } from "@/src/types/ui/themed-text";

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
