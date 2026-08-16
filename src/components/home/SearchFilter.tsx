import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedTextInput } from "@/src/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

interface SearchFilterProps {
  value: string;
  onChangeText: (text: string) => void;

  onSearch?: () => void;
  onFilterPress?: () => void;

  placeholder?: string;
}

export function SearchFilter({
  value,
  onChangeText,
  onSearch,
  onFilterPress,
  placeholder = 'Try "Indiranagar, 3 BHK"',
}: SearchFilterProps) {
  return (
    <ThemedView gap="lg" style={{ flexDirection: "row", alignItems: "center" }}>
      <ThemedView style={{ flex: 1 }}>
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

      <ThemedIconButton
        variant="black"
        icon={<Ionicons name="options-outline" />}
        onPress={onFilterPress}
        size="xl"
      />
    </ThemedView>
  );
}

export default SearchFilter;
