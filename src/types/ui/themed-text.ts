import { TextProps } from "react-native";

import { typography } from "@/src/theme/typography";
import { ThemedColorToken } from "@/src/types/theme-color";

export type ThemedTextVariant = keyof typeof typography;

export type ThemedTextColor = ThemedColorToken;

export interface ThemedTextProps extends TextProps {
  variant?: ThemedTextVariant;
  color?: ThemedTextColor;
}
