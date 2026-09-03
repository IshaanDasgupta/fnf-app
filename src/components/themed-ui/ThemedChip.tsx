import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { useResolveThemeColor } from "@/src/hooks/theme/useResolveThemeColor";
import { renderIcon } from "@/src/lib/utils/iconUtils";
import { radius } from "@/src/theme/radius";
import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";
import { chipVariants } from "@/src/theme/variants/chip";
import { ThemedChipProps } from "@/src/types/ui/themed-chip";

export function ThemedChip({
  variant = "primary",
  selectedVariant = "selected-primary",

  selected: selectedProp = false,
  loading = false,

  leftIcon,
  rightIcon,

  label,
  labelVariant,

  borderRadius = "button",

  style,
  disabled,

  onPress: handlePress,

  controlled = false,

  ...props
}: ThemedChipProps) {
  const [internalSelected, setInternalSelected] = useState(selectedProp);

  const selected = controlled ? selectedProp : internalSelected;

  const config = chipVariants[selected ? selectedVariant : variant];

  const backgroundColor = useResolveThemeColor(config.background);

  const borderColor = config.borderColor
    ? useResolveThemeColor(config.borderColor)
    : undefined;

  const foregroundColor = useResolveThemeColor(config.foregroundColor);

  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      style={[
        styles.base,
        {
          backgroundColor,
          borderColor,
          borderWidth: borderColor ? 1 : undefined,
          borderRadius: radius[borderRadius],
          ...(config.shadow ? shadows[config.shadow] : {}),
        },
        style,
      ]}
      onPress={(event) => {
        handlePress?.(event);

        if (!controlled) {
          setInternalSelected((prev) => !prev);
        }
      }}
    >
      {loading ? (
        <ActivityIndicator color={foregroundColor} />
      ) : (
        <>
          {leftIcon && renderIcon(leftIcon, foregroundColor)}

          <ThemedText variant={labelVariant} color={config.foregroundColor}>
            {label}
          </ThemedText>

          {rightIcon && renderIcon(rightIcon, foregroundColor)}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: sizes.xs,

    paddingHorizontal: sizes.sm,
    paddingVertical: sizes.xs,
  },
});
