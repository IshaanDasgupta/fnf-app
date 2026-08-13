import React from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { useResolveThemeColor } from "@/hooks/useResolveThemeColor";
import { renderIcon } from "@/lib/utils/iconUtils";
import { radius } from "@/theme/radius";
import { shadows } from "@/theme/shadows";
import {
  iconButtonSizes,
  iconButtonVariants,
} from "@/theme/variants/icon-button";
import { ThemedIconButtonProps } from "@/types/ui/themed-icon-button";

export function ThemedIconButton({
  variant = "primary",
  size = "md",

  icon,

  loading = false,
  loadingPlaceholder,

  radius: borderRadius = "button",

  style,
  disabled,

  ...props
}: ThemedIconButtonProps) {
  const variantConfig = iconButtonVariants[variant];
  const sizeConfig = iconButtonSizes[size];

  const backgroundColor = useResolveThemeColor(variantConfig.background);
  const borderColor = variantConfig.borderColor
    ? useResolveThemeColor(variantConfig.borderColor)
    : undefined;
  const foregroundColor = useResolveThemeColor(variantConfig.foregroundColor);

  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      style={[
        styles.base,
        {
          width: sizeConfig.button,
          height: sizeConfig.button,

          backgroundColor,
          borderColor,
          borderWidth: borderColor ? 1 : undefined,

          borderRadius: radius[borderRadius],

          ...(variantConfig.shadow ? shadows[variantConfig.shadow] : {}),
        },
        style,
      ]}
    >
      {loading
        ? (loadingPlaceholder ?? <ActivityIndicator color={foregroundColor} />)
        : renderIcon(icon, foregroundColor, sizeConfig.icon)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
});
