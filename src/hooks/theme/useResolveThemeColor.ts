import { useTheme } from "@/src/hooks/theme/useTheme";
import { ThemedColorToken } from "@/src/types/theme-color";

export function useResolveThemeColor(
  token?: ThemedColorToken,
): string | undefined {
  const { colors } = useTheme();

  if (!token) return undefined;

  return token
    .split(".")
    .reduce<unknown>(
      (value, key) => (value as Record<string, unknown>)?.[key],
      colors,
    ) as string | undefined;
}
