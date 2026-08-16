import { darkColors } from "@/src/theme/dark";
import { lightColors } from "@/src/theme/light";
import { useColorScheme } from "react-native";

export function useTheme() {
  const colorScheme = useColorScheme();

  return {
    colors: colorScheme === "dark" ? darkColors : lightColors,
    isDark: colorScheme === "dark",
    colorScheme,
  };
}
