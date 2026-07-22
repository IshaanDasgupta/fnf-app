import { PressableProps, StyleProp, ViewStyle } from "react-native";

import { radius } from "@/theme/radius";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

import {
  BackgroundColorToken,
  BorderColorToken,
  ForegroundColorToken,
  BrandColorToken,
  StatusColorToken,
} from "@/types/theme-color";
import { shadows } from "@/theme/shadows";

export type ThemedChipVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "black"
  | "outline"
  | "ghost";

export interface ChipVariantConfig {
  background?: BackgroundColorToken | BrandColorToken;

  pressedBackground?: BackgroundColorToken | BrandColorToken;

  selectedBackground?: BackgroundColorToken | BrandColorToken;

  border?: BorderColorToken | BrandColorToken;
  selectedBorder?: BorderColorToken | BrandColorToken;

  text: ForegroundColorToken;
  selectedText?: ForegroundColorToken;

  borderWidth?: number;

  shadow?: keyof typeof shadows;
}

export interface ThemedChipProps extends Omit<
  PressableProps,
  "children" | "style"
> {
  variant?: ThemedChipVariant;

  selected?: boolean;

  loading?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  label: string;

  textVariant?: keyof typeof typography;

  borderRadius?: keyof typeof radius | number;

  horizontalPadding?: keyof typeof spacing | number;
  verticalPadding?: keyof typeof spacing | number;

  style?: StyleProp<ViewStyle>;
}
