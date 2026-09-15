import { getLocalities, Locality } from "@/src/api/locality";
import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedTextInput } from "@/src/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { getLocalitySuggestions } from "@/src/utils/locality";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

export interface SearchFilterProps {
  initialValue?: Locality;
  onLocalitySelect: (locality: Locality | undefined) => void;
  onSearch: () => void;
  onFilterPress: () => void;
  activeFilterCount?: number;
  placeholder?: string;
  resetKey?: boolean;
}

export function SearchFilter({
  initialValue,
  onLocalitySelect,
  onSearch,
  onFilterPress,
  activeFilterCount = 0,
  placeholder = "Search any locality",
  resetKey,
}: SearchFilterProps) {
  const { colors } = useTheme();
  const { city } = useUserLocation();

  const [searchText, setSearchText] = useState(initialValue?.name ?? "");
  const [isLocalitySelected, setIsLocalitySelected] = useState(!!initialValue);

  const { data: localities = [], isLoading: isLocalitiesLoading } = useQuery({
    queryKey: ["localities", city],
    queryFn: () => getLocalities({ city: city! }),
    select: (response) => response.data,
    enabled: !!city,
    staleTime: Infinity,
  });

  const suggestions = useMemo(
    () => getLocalitySuggestions(localities, searchText),
    [localities, searchText],
  );

  const hasActiveFilters = activeFilterCount > 0;
  const showSuggestions = searchText.trim().length > 0 && !isLocalitySelected;

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    setIsLocalitySelected(false);
    onLocalitySelect(undefined);
  };

  const handleLocalitySelect = (locality: Locality) => {
    setSearchText(locality.name);
    setIsLocalitySelected(true);
    onLocalitySelect(locality);
  };

  useEffect(() => {
    setSearchText(initialValue?.name ?? "");
    setIsLocalitySelected(!!initialValue);
  }, [initialValue, resetKey]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.inputWrapper}>
        <ThemedTextInput
          variant="primary"
          textVariant="thinTitle"
          value={searchText}
          onChangeText={handleSearchTextChange}
          placeholder={placeholder}
          returnKeyType="search"
          onSubmitEditing={() => onSearch()}
          borderRadius="button"
          shadow="lg"
          leftIcon={<Ionicons name="search-outline" size={20} />}
          rightIcon={
            <ThemedView style={styles.iconButtonWrapper}>
              <ThemedIconButton
                variant={hasActiveFilters ? "accentPrimary" : "secondary"}
                icon={<Ionicons name="options" size={20} />}
                onPress={onFilterPress}
                size="sm"
                accessibilityLabel="Open filters"
              />

              {hasActiveFilters && (
                <ThemedView
                  variant="inverse"
                  borderRadius="button"
                  style={styles.badge}
                >
                  <ThemedText variant="caption" color="foreground.inverse">
                    {activeFilterCount}
                  </ThemedText>
                </ThemedView>
              )}
            </ThemedView>
          }
          paddingHorizontal="lg"
        />

        {showSuggestions && (
          <ThemedView
            style={styles.suggestionsContainer}
            variant="primary"
            borderRadius="card"
            shadow="lg"
          >
            {isLocalitiesLoading ? (
              <ThemedView style={styles.suggestionRow} padding="xl" gap="md">
                <ActivityIndicator size="small" color={colors.accent.primary} />
                <ThemedText variant="body">Finding localities...</ThemedText>
              </ThemedView>
            ) : suggestions.length > 0 ? (
              suggestions.map((locality) => (
                <Pressable
                  key={locality.name}
                  onPress={() => handleLocalitySelect(locality)}
                >
                  <ThemedView
                    style={styles.suggestionRow}
                    padding="md"
                    paddingVertical="sm"
                    gap="md"
                  >
                    <ThemedView
                      variant="tertiary"
                      borderRadius="button"
                      padding="sm"
                    >
                      <Ionicons
                        name="location-outline"
                        color={colors.foreground.primary}
                        size={14}
                      />
                    </ThemedView>

                    <ThemedText variant="title" numberOfLines={1}>
                      {locality.name}
                    </ThemedText>
                  </ThemedView>
                </Pressable>
              ))
            ) : (
              <ThemedView style={styles.suggestionRow} padding="xl">
                <ThemedText variant="body">No matching localities</ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  inputWrapper: {
    flex: 1,
    position: "relative",
    zIndex: 10,
  },

  suggestionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 6,
    overflow: "hidden",
  },

  suggestionRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButtonWrapper: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
});

export default SearchFilter;
