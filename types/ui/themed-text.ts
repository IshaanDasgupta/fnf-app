import { TextProps } from "react-native";

import { typography } from "@/theme/typography";
import {
  BrandColorToken,
  StatusColorToken,
  TextColorToken,
} from "@/types/theme-color";

export type ThemedTextVariant = keyof typeof typography;

export type ThemedTextColor =
  | TextColorToken
  | BrandColorToken
  | StatusColorToken;

export type ThemedTextAlign = "auto" | "left" | "right" | "center" | "justify";

export interface ThemedTextProps extends TextProps {
  variant?: ThemedTextVariant;
  color?: ThemedTextColor;
  align?: ThemedTextAlign;
  children: React.ReactNode;
}
