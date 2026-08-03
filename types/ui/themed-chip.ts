import { PressableProps, StyleProp, ViewStyle } from "react-native";

import { radius } from "@/theme/radius";

import { shadows } from "@/theme/shadows";
import { ThemedTextVariant } from "@/types/ui/themed-text";
import { ThemedColorToken } from "@/types/theme-color";

export type ThemedChipVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "outline"
  | "ghost"
  | "accent-primary"
  | "accent-secondary"
  | "black"
  | "selected-primary"
  | "selected-secondary"
  | "selected-tertiary"
  | "selected-outline"
  | "selected-ghost"
  | "selected-accent-primary"
  | "selected-accent-secondary"
  | "selected-black"
  | "listing-chip";

export interface ChipVariantConfig {
  background: ThemedColorToken;
  borderColor?: ThemedColorToken;
  foregroundColor: ThemedColorToken;
  shadow?: keyof typeof shadows;
}

export interface ThemedChipProps extends Omit<
  PressableProps,
  "children" | "style"
> {
  variant?: ThemedChipVariant;
  selectedVariant?: ThemedChipVariant;

  selected?: boolean;
  loading?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  label: string;
  labelVariant: ThemedTextVariant;

  borderRadius?: keyof typeof radius;

  style?: StyleProp<ViewStyle>;
}
