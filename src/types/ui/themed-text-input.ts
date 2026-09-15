import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";

import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";

import { shadows } from "@/src/theme/shadows";
import { ThemedColorToken } from "@/src/types/theme-color";
import { ThemedTextVariant } from "@/src/types/ui/themed-text";

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
  leftIconOnPress?: () => {};
  rightIcon?: React.ReactNode;
  rightIconOnPress?: () => {};

  paddingHorizontal?: keyof typeof sizes;
  paddingVertical?: keyof typeof sizes;
  borderRadius?: keyof typeof radius;
  shadow?: keyof typeof shadows;
  gap?: keyof typeof sizes;

  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}
