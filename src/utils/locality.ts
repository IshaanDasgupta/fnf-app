import { Locality } from "@/src/api/locality";

export function normalizeLocality(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "").trim();
}

export function getLocalitySuggestions(
  localities: Locality[],
  query: string,
): Locality[] {
  const normalizedQuery = normalizeLocality(query);

  if (!normalizedQuery) {
    return [];
  }

  return localities
    .filter((locality) =>
      normalizeLocality(locality.name).includes(normalizedQuery),
    )
    .sort((a, b) => {
      const aNormalized = normalizeLocality(a.name);
      const bNormalized = normalizeLocality(b.name);

      const aStartsWith = aNormalized.startsWith(normalizedQuery);
      const bStartsWith = bNormalized.startsWith(normalizedQuery);

      if (aStartsWith !== bStartsWith) {
        return aStartsWith ? -1 : 1;
      }

      return aNormalized.length - bNormalized.length;
    })
    .slice(0, 5);
}
