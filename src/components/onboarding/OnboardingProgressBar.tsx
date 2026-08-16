import React from "react";
import { StyleSheet } from "react-native";

import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { sizes } from "@/src/theme/size";

interface OnboardingProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgressBar({
  currentStep,
  totalSteps,
}: OnboardingProgressBarProps) {
  const { colors } = useTheme();

  return (
    <ThemedView
      style={styles.container}
      gap="md"
      marginBottom="2xl"
      paddingHorizontal="lg"
    >
      <ThemedView style={styles.segments} gap="sm">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const completed = index < currentStep;

          return (
            <ThemedView
              variant={completed ? "accent-primary" : "tertiary"}
              key={index}
              style={[styles.segment]}
            />
          );
        })}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  segments: {
    flex: 1,
    flexDirection: "row",
  },

  segment: {
    flex: 1,
    height: sizes.xs,
    borderRadius: sizes.xs,
  },
});
