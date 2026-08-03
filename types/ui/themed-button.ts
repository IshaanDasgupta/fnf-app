import { sizes } from "@/theme/size";
import { ThemedTextVariant } from "@/types/ui/themed-text";
import { PressableProps, StyleProp, ViewStyle } from "react-native";

export type ThemedButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "accent-primary"
  | "accent-secondary";

import { ThemedColorToken } from "@/types/theme-color";
import { shadows } from "@/theme/shadows";
import { radius } from "@/theme/radius";

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
