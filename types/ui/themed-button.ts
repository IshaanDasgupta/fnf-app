import {
  BackgroundColorToken,
  BorderColorToken,
  ForegroundColorToken,
} from "@/types/theme-color";
import { PressableProps } from "react-native";

export type ThemedButtonVariant = "primary" | "secondary" | "outline" | "ghost";

export interface ButtonVariantConfig {
  background?: BackgroundColorToken | "primary" | "white";
  pressedBackground?: BackgroundColorToken | "primaryPressed";

  border?: BorderColorToken;
  borderWidth?: number;

  text: ForegroundColorToken;

  shadow?: boolean;
  compact?: boolean;
}

export interface ThemedButtonProps extends Omit<PressableProps, "children"> {
  variant?: ThemedButtonVariant;

  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  children: React.ReactNode;
}
