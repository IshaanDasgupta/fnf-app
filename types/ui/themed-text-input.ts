import { TextInputProps, TextStyle, ViewStyle } from "react-native";

import { spacing } from "@/theme/spacing";
import { radius } from "@/theme/radius";

import {
  BackgroundColorToken,
  BorderColorToken,
  ForegroundColorToken,
} from "@/types/theme-color";

import { ThemedTextVariant } from "@/types/ui/themed-text";
import { typography } from "@/theme/typography";

export type ThemedTextInputVariant = "default" | "filled" | "outline" | "ghost";

export interface TextInputVariantConfig {
  background?: BackgroundColorToken | "white";

  border?: BorderColorToken | "primary";
  borderWidth?: number;

  focusedBorder?: BorderColorToken | "primary";
  errorBorder?: BorderColorToken | "status.error";

  text: ForegroundColorToken;
  placeholder: ForegroundColorToken;

  label: ForegroundColorToken;
  helper: ForegroundColorToken;
  error: ForegroundColorToken;

  shadow?: boolean;

  inputTypography?: keyof typeof typography;
}

export interface ThemedTextInputProps extends Omit<TextInputProps, "style"> {
  variant?: ThemedTextInputVariant;

  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: React.ReactNode;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  fullWidth?: boolean;

  labelVariant?: ThemedTextVariant;
  helperVariant?: ThemedTextVariant;
  errorVariant?: ThemedTextVariant;

  borderRadius?: keyof typeof radius;

  paddingHorizontal?: keyof typeof spacing;
  paddingVertical?: keyof typeof spacing;

  inputTypography?: keyof typeof typography;

  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}
