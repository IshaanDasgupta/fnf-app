import React from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { useResolveThemeColor } from "@/src/hooks/theme/useResolveThemeColor";
import { renderIcon } from "@/src/lib/utils/iconUtils";
import { radius } from "@/src/theme/radius";
import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";
import { buttonVariants } from "@/src/theme/variants";
import { ThemedButtonProps } from "@/src/types/ui/themed-button";

export function ThemedButton({
  variant = "accent-primary",
  label,
  labelVariant = "body",
  leftIcon,
  rightIcon,
  loading,
  loadingPlaceholder,

  gap = "sm",
  radius: borderRadius = "button",

  style,
  disabled,

  ...props
}: ThemedButtonProps) {
  const config = buttonVariants[variant];

  const backgroundColor = useResolveThemeColor(config.background);
  const borderColor = config.borderColor
    ? useResolveThemeColor(config.borderColor)
    : undefined;
  const foregroundColor = useResolveThemeColor(config.foregroundColor);

  return (
    <Pressable
      disabled={disabled || loading}
      {...props}
      style={[
        styles.base,

        {
          backgroundColor: backgroundColor,
          borderColor,
          borderWidth: config.borderColor ? 1 : undefined,

          borderRadius: radius[borderRadius],
          gap: sizes[gap],

          ...(config.shadow ? shadows[config.shadow] : {}),
        },

        style,
      ]}
    >
      {loading ? (
        (loadingPlaceholder ?? <ActivityIndicator color={foregroundColor} />)
      ) : (
        <>
          {leftIcon && renderIcon(leftIcon, foregroundColor)}

          {label && (
            <ThemedText variant={labelVariant} color={config.foregroundColor}>
              {label}
            </ThemedText>
          )}

          {rightIcon && renderIcon(rightIcon, foregroundColor)}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: sizes.lg,
    paddingVertical: sizes.lg,
  },
});
