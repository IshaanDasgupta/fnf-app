import { ScrollView } from "react-native";

import { useResolveThemeColor } from "@/hooks/useResolveThemeColor";
import { radius } from "@/theme/radius";
import { sizes } from "@/theme/size";
import { viewVariants } from "@/theme/variants/view";
import { ThemedScrollViewProps } from "@/types/ui/themed-scroll-view";

export function ThemedScrollView({
  variant = "transparent",

  borderRadius,

  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,

  style,
  contentContainerStyle,

  ...props
}: ThemedScrollViewProps) {
  const config = viewVariants[variant];

  const resolvedBackground = useResolveThemeColor(config.background);
  const resolvedBorder = useResolveThemeColor(config.borderColor);

  return (
    <ScrollView
      {...props}
      style={[
        {
          backgroundColor: resolvedBackground,

          borderColor: resolvedBorder,
          borderWidth: resolvedBorder ? 1 : undefined,

          borderRadius: borderRadius ? radius[borderRadius] : undefined,
        },
        style,
      ]}
      contentContainerStyle={[
        {
          padding: padding ? sizes[padding] : undefined,
          paddingHorizontal: paddingHorizontal
            ? sizes[paddingHorizontal]
            : undefined,
          paddingVertical: paddingVertical ? sizes[paddingVertical] : undefined,
          paddingTop: paddingTop ? sizes[paddingTop] : undefined,
          paddingBottom: paddingBottom ? sizes[paddingBottom] : undefined,
          paddingLeft: paddingLeft ? sizes[paddingLeft] : undefined,
          paddingRight: paddingRight ? sizes[paddingRight] : undefined,
        },
        contentContainerStyle,
      ]}
    />
  );
}
