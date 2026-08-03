import { ThemedButton } from "@/components/themed-ui/ThemedButton";
import { ThemedIconButton } from "@/components/themed-ui/ThemedIconButton";
import { ThemedTextInput } from "@/components/themed-ui/ThemedTextInput";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

export function MapTopBar() {
  const [searchText, setSearchText] = useState("");

  const onSearch = () => {};

  return (
    <ThemedView style={styles.container} gap="sm">
      <ThemedTextInput
        variant="tertiary"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        placeholder="Search area"
        returnKeyType="search"
        onSubmitEditing={onSearch}
        leftIcon={<Ionicons name="search-outline" size={24} />}
        paddingHorizontal="lg"
        containerStyle={styles.search}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },

  search: {
    flex: 1,
  },
});
