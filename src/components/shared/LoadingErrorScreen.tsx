import React from "react";
import { StyleSheet } from "react-native";

import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { sizes } from "@/src/theme/size";
import { AntDesign, Entypo } from "@expo/vector-icons";

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
    <ThemedSafeArea style={styles.container}>
      <ThemedView
        variant="primary"
        borderRadius="card"
        style={styles.emptyState}
      >
        <ThemedView variant="secondary" style={styles.iconCircle}>
          <AntDesign name="exclamation" size={34} color="#666" />
        </ThemedView>

        <Spacer size="lg" />

        <ThemedText variant="h3" color="foreground.primary">
          {title}
        </ThemedText>

        <Spacer size="xs" />

        <ThemedText
          variant="bodySmall"
          color="foreground.secondary"
          style={styles.emptyDescription}
        >
          {message}
        </ThemedText>

        <Spacer size="3xl" />

        {onRetry && (
          <ThemedButton
            leftIcon={<Entypo name="cw" size={20} />}
            label={retryLabel}
            labelVariant="title"
            onPress={onRetry}
            loading={retryLoading}
            style={{ paddingHorizontal: sizes["8xl"] }}
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
    padding: sizes.lg,
  },

  message: {
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },

  emptyState: {
    minHeight: 276,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: sizes.lg,
    paddingVertical: sizes["2xl"],
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyDescription: {
    textAlign: "center",
    lineHeight: 17.6,
  },
});
