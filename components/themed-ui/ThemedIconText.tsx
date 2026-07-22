import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { useColors } from "@/hooks/useColors";

import { resolveThemeColor } from "@/utils/resolve-theme-color";
import { resolveToken } from "@/utils/resolve-token";

import { spacing } from "@/theme/spacing";

import { ThemedText } from "./ThemedText";

import { ThemedIconTextProps } from "@/types/ui/themed-icon-text";

function cloneIcon(icon: React.ReactNode, color: string) {
  if (!React.isValidElement(icon)) {
    return icon;
  }

  const element = icon as React.ReactElement<{
    color?: string;
  }>;

  return React.cloneElement(element, {
    color: element.props.color ?? color,
  });
}

export function ThemedIconText({
  icon,
  text,

  color = "text.secondary",
  variant = "body",

  gap = "sm",

  iconPosition = "left",

  alignItems = "center",
  justifyContent,

  style,

  onPress,

  ...rest
}: ThemedIconTextProps) {
  const colors = useColors();

  const resolvedColor = resolveThemeColor(colors, color);

  const iconElement = cloneIcon(icon, resolvedColor);

  const content = (
    <>
      {iconElement}

      <ThemedText variant={variant} color={color}>
        {text}
      </ThemedText>
    </>
  );

  const containerStyle = [
    styles.container,
    {
      gap: resolveToken(gap, spacing),

      alignItems,
      justifyContent,

      flexDirection: iconPosition === "left" ? "row" : "row-reverse",
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable style={containerStyle} onPress={onPress} {...rest}>
        {content}
      </Pressable>
    );
  }

  return (
    <View style={containerStyle} {...rest}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default ThemedIconText;
