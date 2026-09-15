import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { navigation } from "@/src/lib/navigation";
import { sizes } from "@/src/theme/size";

export default function NotFoundScreen() {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace(navigation.tabs.home);
  };

  return (
    <ThemedSafeArea>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.content}>
          <ThemedText variant="display" color="foreground.primary">
            404
          </ThemedText>

          <ThemedText
            variant="display"
            color="foreground.primary"
            style={styles.title}
          >
            Looks like you're lost
          </ThemedText>

          <ThemedText
            variant="body"
            color="foreground.secondary"
            style={styles.description}
          >
            The page you're looking for doesn't exist or may have been moved.
          </ThemedText>

          <ThemedButton
            label="Back to Home"
            labelVariant="h3"
            onPress={handleGoHome}
            style={styles.button}
          />
        </ThemedView>
      </ThemedView>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: sizes["2xl"],
  },

  content: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
  },

  title: {
    textAlign: "center",
  },

  description: {
    marginTop: sizes.sm,
    textAlign: "center",
  },

  button: {
    width: "100%",
    marginTop: sizes["2xl"],
  },
});
