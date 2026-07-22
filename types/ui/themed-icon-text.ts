import React from "react";
import { GestureResponderEvent, ViewProps, ViewStyle } from "react-native";

import { spacing } from "@/theme/spacing";

import { ForegroundColorToken } from "@/types/theme-color";

import { ThemedTextVariant } from "@/types/ui/themed-text";

export interface ThemedIconTextProps extends ViewProps {
  icon: React.ReactNode;

  text: string;

  color?: ForegroundColorToken;

  variant?: ThemedTextVariant;

  gap?: keyof typeof spacing | number;

  iconPosition?: "left" | "right";

  alignItems?: ViewStyle["alignItems"];

  justifyContent?: ViewStyle["justifyContent"];

  onPress?: (event: GestureResponderEvent) => void;
}
