import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedSafeAreaProps } from "@/types/ui/themed-safe-area";
import { viewVariants } from "@/theme/variants";
import { useResolveThemeColor } from "@/hooks/useResolveThemeColor";
import { sizes } from "@/theme/size";

export function ThemedSafeArea({
  variant = "primary",
  padding,
  style,
  children,
  ...rest
}: ThemedSafeAreaProps) {
  const config = viewVariants[variant];

  const resolvedBackground = useResolveThemeColor(config.background);

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: resolvedBackground,
          padding: padding ? sizes[padding] : undefined,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
}

export default ThemedSafeArea;
