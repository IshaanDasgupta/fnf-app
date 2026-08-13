import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { useResolveThemeColor } from "@/hooks/useResolveThemeColor";
import { renderIcon } from "@/lib/utils/iconUtils";
import { radius } from "@/theme/radius";
import { shadows } from "@/theme/shadows";
import { sizes } from "@/theme/size";
import { typography } from "@/theme/typography";
import { textInputVariants } from "@/theme/variants/text-input";
import { ThemedTextInputProps } from "@/types/ui/themed-text-input";

export function ThemedTextInput({
  variant = "primary",

  label,
  labelVariant = "label",

  textVariant = "body",

  leftIcon,
  rightIcon,

  paddingHorizontal = "sm",
  paddingVertical = "sm",

  borderRadius = "card",
  shadow,

  gap = "xs",

  containerStyle,
  inputStyle,

  onFocus,
  onBlur,

  ...props
}: ThemedTextInputProps) {
  const [focused, setFocused] = useState(false);

  const config = textInputVariants[variant];

  const backgroundColor = useResolveThemeColor(config.background);
  const borderColor = useResolveThemeColor(
    focused ? config.focusedBorder : config.borderColor,
  );

  const textColor = useResolveThemeColor(config.textColor);
  const placeholderColor = useResolveThemeColor(config.placeholderColor);
  const iconColor = useResolveThemeColor(config.iconColor);

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          borderWidth: borderColor ? 1 : undefined,
          borderRadius: radius[borderRadius],

          paddingHorizontal: sizes[paddingHorizontal],
          paddingVertical: sizes[paddingVertical],

          ...(shadow ? shadows[shadow] : {}),
          gap: sizes[gap],
        },
        containerStyle,
      ]}
    >
      {leftIcon && renderIcon(leftIcon, iconColor)}

      <ThemedView
        style={[
          styles.inputContainer,
          {
            gap: sizes[gap],
          },
        ]}
      >
        {label && (
          <ThemedText variant={labelVariant} color={config.labelColor}>
            {label}
          </ThemedText>
        )}

        <TextInput
          {...props}
          style={[
            typography[textVariant],
            {
              color: textColor,
            },
            ,
            inputStyle,
          ]}
          placeholderTextColor={placeholderColor}
          cursorColor={textColor}
          selectionColor={textColor}
          underlineColorAndroid="transparent"
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />
      </ThemedView>

      {rightIcon && renderIcon(rightIcon, iconColor)}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  inputContainer: {
    flex: 1,
    flexDirection: "column",
  },
});
