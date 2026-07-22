export function resolveToken<T extends Record<string, number>>(
  value: keyof T | number | undefined,
  tokens: T,
): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === "number" ? value : tokens[value];
}
