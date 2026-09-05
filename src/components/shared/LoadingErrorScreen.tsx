import React from "react";
import { StyleSheet } from "react-native";

import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

interface LoadingErrorScreenProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  retryLoading?: boolean;
}

export function LoadingErrorScreen({
  title = "Something went wrong",
  message = "Something went wrong while loading this page. Please try again.",
  retryLabel = "Try Again",
  onRetry,
  retryLoading = false,
}: LoadingErrorScreenProps) {
  return (
    <ThemedSafeArea>
      <ThemedView style={styles.container}>
        <ThemedText variant="h3">{title}</ThemedText>

        <ThemedText
          variant="body"
          color="foreground.secondary"
          style={styles.message}
        >
          {message}
        </ThemedText>

        {onRetry && (
          <ThemedButton
            label={retryLabel}
            onPress={onRetry}
            loading={retryLoading}
          />
        )}
      </ThemedView>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  message: {
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
});
