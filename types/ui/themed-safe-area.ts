import { SafeAreaViewProps } from "react-native-safe-area-context";
import { sizes } from "@/theme/size";
import { ThemedColorToken } from "@/types/theme-color";
import { ThemedViewVariant } from "@/types/ui/themed-view";

export interface ThemedSafeAreaProps extends SafeAreaViewProps {
  variant?: ThemedViewVariant;
  padding?: keyof typeof sizes;
  children?: React.ReactNode;
}
