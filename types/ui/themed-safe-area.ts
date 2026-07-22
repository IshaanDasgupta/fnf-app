import { SafeAreaViewProps } from "react-native-safe-area-context";

import { BackgroundColorToken } from "@/types/theme-color";

export type ThemedSafeAreaVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "elevated"
  | "transparent";

export interface ThemedSafeAreaProps extends SafeAreaViewProps {
  variant?: ThemedSafeAreaVariant;
  backgroundColor?: BackgroundColorToken;
  children?: React.ReactNode;
}
