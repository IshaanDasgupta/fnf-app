import { View } from "react-native";

import { useResolveThemeColor } from "@/hooks/useResolveThemeColor";
import { radius } from "@/theme/radius";
import { sizes } from "@/theme/size";
import { viewVariants } from "@/theme/variants/view";
import { ThemedViewProps } from "@/types/ui/themed-view";

export function ThemedView({
  variant = "transparent",

  borderRadius,

  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,

  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,

  gap,

  style,

  ...props
}: ThemedViewProps) {
  const config = viewVariants[variant];

  const resolvedBackground = useResolveThemeColor(config.background);

  const resolvedBorder = useResolveThemeColor(config.borderColor);

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: resolvedBackground,

          borderColor: resolvedBorder,
          borderWidth: resolvedBorder ? 1 : undefined,

          borderRadius: borderRadius ? radius[borderRadius] : undefined,

          padding: padding ? sizes[padding] : undefined,
          paddingHorizontal: paddingHorizontal
            ? sizes[paddingHorizontal]
            : undefined,
          paddingVertical: paddingVertical ? sizes[paddingVertical] : undefined,
          paddingTop: paddingTop ? sizes[paddingTop] : undefined,
          paddingBottom: paddingBottom ? sizes[paddingBottom] : undefined,
          paddingLeft: paddingLeft ? sizes[paddingLeft] : undefined,
          paddingRight: paddingRight ? sizes[paddingRight] : undefined,

          margin: margin ? sizes[margin] : undefined,
          marginHorizontal: marginHorizontal
            ? sizes[marginHorizontal]
            : undefined,
          marginVertical: marginVertical ? sizes[marginVertical] : undefined,
          marginTop: marginTop ? sizes[marginTop] : undefined,
          marginBottom: marginBottom ? sizes[marginBottom] : undefined,
          marginLeft: marginLeft ? sizes[marginLeft] : undefined,
          marginRight: marginRight ? sizes[marginRight] : undefined,

          gap: gap ? sizes[gap] : undefined,
        },
        style,
      ]}
    />
  );
}
