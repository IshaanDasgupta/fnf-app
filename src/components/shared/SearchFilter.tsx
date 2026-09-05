import { getLocalities } from "@/src/api/listing";
import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedTextInput } from "@/src/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { getLocalitySuggestions } from "@/src/utils/locality";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

export interface SearchFilterProps {
  onLocalitySelect: (locality: string | undefined) => void;
  onSearch: () => void;
  onFilterPress: () => void;
  activeFilterCount?: number;
  placeholder?: string;
}

export function SearchFilter({
  onLocalitySelect,
  onSearch,
  onFilterPress,
  activeFilterCount = 0,
  placeholder = 'Try "Indiranagar, 3 BHK"',
}: SearchFilterProps) {
  const { colors } = useTheme();

  const [searchText, setSearchText] = useState("");
  const [isLoacalitySelected, setIsLoacalitySelected] = useState(false);

  const { city } = useUserLocation();

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
  const showSuggestions = searchText.trim().length > 0 && !isLoacalitySelected;

  const handleSearchTextChange = (text: string) => {
    onLocalitySelect(undefined);
    setIsLoacalitySelected(false);
    setSearchText(text);
  };

  const handleLocalitySelect = (locality: string) => {
    onLocalitySelect(locality);
    setIsLoacalitySelected(true);
    setSearchText(locality);
  };

  return (
    <ThemedView gap="lg" style={styles.container}>
      <ThemedView style={styles.inputWrapper}>
        <ThemedTextInput
          variant="tertiary"
          value={searchText}
          onChangeText={handleSearchTextChange}
          placeholder={placeholder}
          returnKeyType="search"
          onSubmitEditing={onSearch}
          leftIcon={<Ionicons name="search-outline" size={20} />}
          paddingHorizontal="lg"
        />

        {showSuggestions && (
          <ThemedView
            style={styles.suggestionsContainer}
            variant="inverse"
            borderRadius="card"
          >
            {isLocalitiesLoading ? (
              <ThemedView style={styles.suggestionRow} padding="xl" gap="md">
                <ActivityIndicator size="small" color={colors.accent.primary} />
                <ThemedText variant="body" color="foreground.inverse">
                  Finding localities...
                </ThemedText>
              </ThemedView>
            ) : suggestions.length > 0 ? (
              suggestions.map((locality) => (
                <Pressable
                  key={locality}
                  onPress={() => handleLocalitySelect(locality)}
                >
                  <ThemedView
                    style={styles.suggestionRow}
                    padding="lg"
                    gap="md"
                  >
                    <Ionicons name="location-outline" size={18} />
                    <ThemedText numberOfLines={1} color="foreground.inverse">
                      {locality}
                    </ThemedText>
                  </ThemedView>
                </Pressable>
              ))
            ) : (
              <ThemedView style={styles.suggestionRow} padding="xl">
                <ThemedText variant="body" color="foreground.inverse">
                  No matching localities
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.iconButtonWrapper}>
        <ThemedIconButton
          variant={hasActiveFilters ? "accentPrimary" : "black"}
          icon={<Ionicons name="options-outline" />}
          onPress={onFilterPress}
          size="xl"
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

  iconButtonWrapper: {
    position: "relative",
  },
});

export default SearchFilter;
