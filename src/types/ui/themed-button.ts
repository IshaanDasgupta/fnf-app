import { sizes } from "@/src/theme/size";
import { ThemedTextVariant } from "@/src/types/ui/themed-text";
import { PressableProps, StyleProp, ViewStyle } from "react-native";

export type ThemedButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "inverse"
  | "accent-primary"
  | "accent-secondary"
  | "logout";

import { radius } from "@/src/theme/radius";
import { shadows } from "@/src/theme/shadows";
import { ThemedColorToken } from "@/src/types/theme-color";

export interface ThemedButtonVariantConfig {
  background: ThemedColorToken;
  borderColor?: ThemedColorToken;
  foregroundColor: ThemedColorToken;
  shadow?: keyof typeof shadows;
}

export interface ThemedButtonProps extends Omit<PressableProps, "style"> {
  variant?: ThemedButtonVariant;
  label?: string;
  labelVariant?: ThemedTextVariant;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  loading?: boolean;
  loadingPlaceholder?: React.ReactNode;

  gap?: keyof typeof sizes;

  radius?: keyof typeof radius;

  style?: StyleProp<ViewStyle>;
}
