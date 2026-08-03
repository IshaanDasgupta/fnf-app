import { radius } from "@/theme/radius";
import { shadows } from "@/theme/shadows";
import { ThemedColorToken } from "@/types/theme-color";

import { PressableProps, StyleProp, ViewStyle } from "react-native";

export type ThemedIconButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "outline"
  | "ghost"
  | "accentPrimary"
  | "accentSecondary"
  | "black"
  | "fav"
  | "tab";

export type ThemedIconButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconButtonVariantConfig {
  background: ThemedColorToken;
  borderColor?: ThemedColorToken;
  foregroundColor: ThemedColorToken;
  shadow?: keyof typeof shadows;
}

export interface IconButtonSizeConfig {
  button: number;
  icon: number;
}

export interface ThemedIconButtonProps extends Omit<
  PressableProps,
  "children"
> {
  variant?: ThemedIconButtonVariant;
  size?: ThemedIconButtonSize;

  icon: React.ReactNode;

  loading?: boolean;
  loadingPlaceholder?: React.ReactNode;

  radius?: keyof typeof radius;

  style?: StyleProp<ViewStyle>;
}
