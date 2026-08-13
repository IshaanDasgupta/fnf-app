import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-ui/ThemedText";
import { useResolveThemeColor } from "@/hooks/useResolveThemeColor";
import { renderIcon } from "@/lib/utils/iconUtils";
import { radius } from "@/theme/radius";
import { shadows } from "@/theme/shadows";
import { sizes } from "@/theme/size";
import { chipVariants } from "@/theme/variants/chip";
import { ThemedChipProps } from "@/types/ui/themed-chip";

export function ThemedChip({
  variant = "primary",
  selectedVariant = "selected-primary",

  selected: initSelectedVal = false,
  loading = false,

  leftIcon,
  rightIcon,

  label,
  labelVariant,

  borderRadius = "button",

  style,
  disabled,

  onPress: handelPress,

  ...props
}: ThemedChipProps) {
  const [selected, setSelected] = useState(initSelectedVal);

  useEffect(() => {
    setSelected(initSelectedVal);
  }, [initSelectedVal]);

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
        handelPress?.(event);
        setSelected((prev) => !prev);
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
