import { ScrollViewProps } from "react-native";

import { radius } from "@/theme/radius";
import { sizes } from "@/theme/size";
import { ThemedViewVariant } from "@/types/ui/themed-view";

export interface ThemedScrollViewProps extends ScrollViewProps {
  variant?: ThemedViewVariant;

  borderRadius?: keyof typeof radius;

  padding?: keyof typeof sizes;
  paddingHorizontal?: keyof typeof sizes;
  paddingVertical?: keyof typeof sizes;
  paddingTop?: keyof typeof sizes;
  paddingBottom?: keyof typeof sizes;
  paddingLeft?: keyof typeof sizes;
  paddingRight?: keyof typeof sizes;

  children?: React.ReactNode;
}
