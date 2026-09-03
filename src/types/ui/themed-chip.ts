import { PressableProps, StyleProp, ViewStyle } from "react-native";

import { radius } from "@/src/theme/radius";

import { shadows } from "@/src/theme/shadows";
import { ThemedColorToken } from "@/src/types/theme-color";
import { ThemedTextVariant } from "@/src/types/ui/themed-text";

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

  controlled?: boolean;
}
