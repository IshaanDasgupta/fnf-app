import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { useColors } from "@/hooks/useColors";

import { radius } from "@/theme/radius";
import { shadows } from "@/theme/shadows";
import { spacing } from "@/theme/spacing";
import { textInputVariants } from "@/theme/text-input-variant";

import { resolveThemeColor } from "@/utils/resolve-theme-color";

import { ThemedText } from "./ThemedText";

import { ThemedTextInputProps } from "@/types/ui/themed-text-input";
import { resolveToken } from "@/utils/resolve-token";
import { typography } from "@/theme/typography";

export function ThemedTextInput({
  variant = "default",

  label,
  helperText,
  error,

  leftIcon,
  rightIcon,

  fullWidth = true,

  labelVariant = "label",
  helperVariant = "caption",
  errorVariant = "caption",

  borderRadius = "input",
  paddingHorizontal = "lg",
  paddingVertical = "md",

  editable = true,

  inputTypography,

  containerStyle,
  inputStyle,

  onFocus,
  onBlur,

  ...rest
}: ThemedTextInputProps) {
  const colors = useColors();

  const config = textInputVariants[variant];

  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? resolveThemeColor(colors, config.errorBorder)
    : focused
      ? resolveThemeColor(colors, config.focusedBorder)
      : resolveThemeColor(colors, config.border);

  const inputTypographyStyle =
    typography[inputTypography ?? config.inputTypography ?? "body"];

  return (
    <View style={[fullWidth && styles.fullWidth]}>
      {label && (
        <ThemedText
          variant={labelVariant}
          color={config.label}
          style={styles.label}
        >
          {label}
        </ThemedText>
      )}

      <Pressable
        style={[
          styles.container,
          {
            backgroundColor: resolveThemeColor(colors, config.background),
            borderColor,
            borderWidth: config.borderWidth ?? 1,
            borderRadius: resolveToken(borderRadius, radius),
            paddingHorizontal: resolveToken(paddingHorizontal, spacing),
            paddingVertical: resolveToken(paddingVertical, spacing),
            opacity: editable ? 1 : 0.6,
            ...(config.shadow ? shadows.lg : {}),
          },
          containerStyle,
        ]}
      >
        {leftIcon}

        <TextInput
          {...rest}
          editable={editable}
          style={[
            styles.input,
            inputTypographyStyle,
            {
              color: resolveThemeColor(colors, config.text),
            },
            inputStyle,
          ]}
          placeholderTextColor={resolveThemeColor(colors, config.placeholder)}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />

        {rightIcon}
      </Pressable>

      {error ? (
        <ThemedText
          variant={errorVariant}
          color={config.error}
          style={styles.footer}
        >
          {error}
        </ThemedText>
      ) : helperText ? (
        <ThemedText
          variant={helperVariant}
          color={config.helper}
          style={styles.footer}
        >
          {helperText}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: "100%",
  },

  label: {
    marginBottom: spacing.sm,
  },

  container: {
    minHeight: 52,

    flexDirection: "row",
    alignItems: "center",

    gap: spacing.sm,

    borderWidth: 1,
  },

  input: {
    flex: 1,
    padding: 0,
  },

  footer: {
    marginTop: spacing.xs,
  },
});

export default ThemedTextInput;
