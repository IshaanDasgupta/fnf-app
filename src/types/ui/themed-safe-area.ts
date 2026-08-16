import { sizes } from "@/src/theme/size";
import { ThemedViewVariant } from "@/src/types/ui/themed-view";
import { SafeAreaViewProps } from "react-native-safe-area-context";

export interface ThemedSafeAreaProps extends SafeAreaViewProps {
  variant?: ThemedViewVariant;
  padding?: keyof typeof sizes;
  children?: React.ReactNode;
}
