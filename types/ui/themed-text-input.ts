import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";

import { sizes } from "@/theme/size";
import { radius } from "@/theme/radius";

import { ThemedTextVariant } from "@/types/ui/themed-text";
import { shadows } from "@/theme/shadows";
import { ThemedColorToken } from "@/types/theme-color";

export type ThemedTextInputVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "outline"
  | "ghost";

export interface ThemedInputVariantConfig {
  background: ThemedColorToken;
  borderColor?: ThemedColorToken;

  labelColor: ThemedColorToken;

  textColor: ThemedColorToken;
  placeholderColor: ThemedColorToken;

  iconColor: ThemedColorToken;

  focusedBorder?: ThemedColorToken;
}

export interface ThemedTextInputProps extends Omit<TextInputProps, "style"> {
  variant?: ThemedTextInputVariant;

  label?: string;
  labelVariant?: ThemedTextVariant;

  textVariant?: ThemedTextVariant;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  paddingHorizontal?: keyof typeof sizes;
  paddingVertical?: keyof typeof sizes;
  borderRadius?: keyof typeof radius;
  shadow?: keyof typeof shadows;
  gap?: keyof typeof sizes;

  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}
