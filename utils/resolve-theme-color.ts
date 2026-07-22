import { SemanticThemeColorKey, ThemeColors } from "@/types/theme-color";

export function resolveThemeColor(
  colors: ThemeColors,
  token?: SemanticThemeColorKey,
): string | undefined {
  if (!token) {
    return undefined;
  }

  const keys = token.split(".");

  let value: unknown = colors;

  for (const key of keys) {
    value = (value as Record<string, unknown>)?.[key];
  }

  return typeof value === "string" ? value : undefined;
}
