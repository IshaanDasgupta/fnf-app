import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { ThemedButton } from "@/components/themed-ui/ThemedButton";
import { ThemedIconButton } from "@/components/themed-ui/ThemedIconButton";
import { ThemedTextInput } from "@/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { useColors } from "@/hooks/useColors";

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
  const colors = useColors();

  return (
    <ThemedView flexDirection="row" alignItems="center" gap="lg">
      <ThemedView flex={1}>
        <ThemedTextInput
          variant="filled"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          returnKeyType="search"
          onSubmitEditing={onSearch}
          leftIcon={
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.text.secondary}
            />
          }
        />
      </ThemedView>

      <ThemedIconButton
        variant="black"
        icon={<Ionicons name="options-outline" size={20} />}
        onPress={onFilterPress}
        size="lg"
      />
    </ThemedView>
  );
}

export default SearchFilter;
