import { radius } from "@/src/theme/radius";
import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";
import { ThemedColorToken } from "@/src/types/theme-color";
import { ViewProps } from "react-native";

export type ThemedViewVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "transparent"
  | "accent-primary";

export interface ViewVariantConfig {
  background?: ThemedColorToken;
  borderColor?: ThemedColorToken;
}

export interface ThemedViewProps extends ViewProps {
  variant?: ThemedViewVariant;

  borderRadius?: keyof typeof radius;

  padding?: keyof typeof sizes;
  paddingHorizontal?: keyof typeof sizes;
  paddingVertical?: keyof typeof sizes;
  paddingTop?: keyof typeof sizes;
  paddingBottom?: keyof typeof sizes;
  paddingLeft?: keyof typeof sizes;
  paddingRight?: keyof typeof sizes;

  margin?: keyof typeof sizes;
  marginHorizontal?: keyof typeof sizes;
  marginVertical?: keyof typeof sizes;
  marginTop?: keyof typeof sizes;
  marginBottom?: keyof typeof sizes;
  marginLeft?: keyof typeof sizes;
  marginRight?: keyof typeof sizes;

  gap?: keyof typeof sizes;

  shadow?: keyof typeof shadows;

  children?: React.ReactNode;
}
