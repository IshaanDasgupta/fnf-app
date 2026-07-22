import { radius } from "@/theme/radius";
import { spacing } from "@/theme/spacing";
import { BackgroundColorToken } from "@/types/theme-color";
import { ViewProps, ViewStyle } from "react-native";

export type ThemedViewVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "elevated"
  | "transparent"
  | "black";

export type BorderColorToken = "border.primary" | "border.secondary";

export interface ThemedViewProps extends ViewProps {
  variant?: ThemedViewVariant;

  backgroundColor?: BackgroundColorToken;
  borderColor?: BorderColorToken;

  borderRadius?: keyof typeof radius | number;

  padding?: keyof typeof spacing | number;
  margin?: keyof typeof spacing | number;
  gap?: keyof typeof spacing | number;

  flex?: ViewStyle["flex"];
  flexGrow?: ViewStyle["flexGrow"];
  flexShrink?: ViewStyle["flexShrink"];

  flexDirection?: ViewStyle["flexDirection"];

  alignSelf?: ViewStyle["alignSelf"];
  alignItems?: ViewStyle["alignItems"];
  justifyContent?: ViewStyle["justifyContent"];

  position?: ViewStyle["position"];

  children?: React.ReactNode;
}
