import { shadows } from "@/theme/shadows";
import {
  BackgroundColorToken,
  BorderColorToken,
  ForegroundColorToken,
} from "@/types/theme-color";
import { PressableProps } from "react-native";

export type ThemedIconButtonVariant =
  | "primary"
  | "secondary"
  | "black"
  | "outline"
  | "ghost"
  | "fav"
  | "tab";

export type ThemedIconButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export const iconButtonSizes: Record<
  ThemedIconButtonSize,
  {
    button: number;
    icon: number;
  }
> = {
  xs: { button: 28, icon: 14 },
  sm: { button: 36, icon: 16 },
  md: { button: 44, icon: 18 },
  lg: { button: 52, icon: 20 },
  xl: { button: 60, icon: 24 },
};

export interface IconButtonVariantConfig {
  background?: BackgroundColorToken | "primary";
  pressedBackground?: BackgroundColorToken | "primaryPressed";
  selectedBackground?: BackgroundColorToken;

  border?: BorderColorToken | "primary";
  selectedBorder?: BorderColorToken | "primary";

  icon: ForegroundColorToken;
  selectedIcon?: ForegroundColorToken;

  borderWidth?: number;

  shadow?: keyof typeof shadows;
}

export interface ThemedIconButtonProps extends Omit<
  PressableProps,
  "children"
> {
  variant?: ThemedIconButtonVariant;
  size?: ThemedIconButtonSize;

  icon: React.ReactNode;

  loading?: boolean;
  disabled?: boolean;
  selected?: boolean;

  fullWidth?: boolean;
}
