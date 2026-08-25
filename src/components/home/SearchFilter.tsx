import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedTextInput } from "@/src/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

export interface SearchFilterProps {
  value: string;
  onChangeText: (text: string) => void;

  onSearch?: () => void;
  onFilterPress?: () => void;
  activeFilterCount?: number;

  placeholder?: string;
}

export function SearchFilter({
  value,
  onChangeText,
  onSearch,
  onFilterPress,
  activeFilterCount = 0,
  placeholder = 'Try "Indiranagar, 3 BHK"',
}: SearchFilterProps) {
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <ThemedView gap="lg" style={styles.container}>
      <ThemedView style={styles.inputWrapper}>
        <ThemedTextInput
          variant="tertiary"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          returnKeyType="search"
          onSubmitEditing={onSearch}
          leftIcon={<Ionicons name="search-outline" size={20} />}
          paddingHorizontal="lg"
        />
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
            variant="accent-primary"
            borderRadius="button"
            style={styles.badge}
          >
            <ThemedText
              variant="caption"
              color="foreground.white"
              style={styles.badgeText}
            >
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
  badgeText: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "700",
  },
});

export default SearchFilter;
