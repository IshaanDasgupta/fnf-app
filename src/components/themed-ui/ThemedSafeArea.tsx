import { useResolveThemeColor } from "@/src/hooks/theme/useResolveThemeColor";
import { sizes } from "@/src/theme/size";
import { viewVariants } from "@/src/theme/variants";
import { ThemedSafeAreaProps } from "@/src/types/ui/themed-safe-area";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

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
