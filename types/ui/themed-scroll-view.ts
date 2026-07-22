import { ScrollViewProps } from "react-native";

import { spacing } from "@/theme/spacing";
import { BackgroundColorToken } from "@/types/theme-color";

export type ThemedScrollViewVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "elevated"
  | "transparent";

export interface ThemedScrollViewProps extends ScrollViewProps {
  variant?: ThemedScrollViewVariant;

  backgroundColor?: BackgroundColorToken;

  padding?: keyof typeof spacing | number;

  children?: React.ReactNode;
}
