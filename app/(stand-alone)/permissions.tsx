import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { AppState, Linking, StyleSheet } from "react-native";

import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { sizes } from "@/src/theme/size";

export default function PermissionScreen() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const checkLocationPermission = async () => {
    try {
      const { status, canAskAgain } =
        await Location.getForegroundPermissionsAsync();

      if (status === Location.PermissionStatus.GRANTED) {
        router.replace("/(tabs)/home");
        return;
      }

      setPermissionDenied(!canAskAgain);
    } catch (error) {
      console.error("Failed to check location permission:", error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      setIsLoading(true);

      const { status, canAskAgain } =
        await Location.requestForegroundPermissionsAsync();

      if (status === Location.PermissionStatus.GRANTED) {
        router.replace("/(tabs)/home");
        return;
      }

      setPermissionDenied(!canAskAgain);
    } catch (error) {
      console.error("Failed to request location permission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openSettings = async () => {
    await Linking.openSettings();
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextState) => {
        if (nextState === "active") {
          await checkLocationPermission();
        }
      },
    );

    return () => subscription.remove();
  }, []);

  return (
    <ThemedSafeArea>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.content}>
          <ThemedView variant="secondary" style={styles.iconContainer}>
            <Ionicons
              name="location"
              size={36}
              color={colors.foreground.secondary}
            />
          </ThemedView>

          <Spacer size="lg" />

          <ThemedText variant="h3" style={styles.title}>
            Location is required
          </ThemedText>

          <Spacer size="xs" />

          <ThemedText
            variant="bodySmall"
            color="foreground.secondary"
            style={styles.description}
          >
            Location permission is required to show nearby flat listings and
            power map-based listing search.
          </ThemedText>
        </ThemedView>

        <ThemedView>
          {permissionDenied ? (
            <>
              <ThemedButton
                labelVariant="h3"
                label="Open Settings"
                onPress={openSettings}
                disabled={isLoading}
              />

              <ThemedText
                variant="bodySmall"
                color="foreground.secondary"
                style={styles.settingsHint}
              >
                Location permission has been disabled. Please enable it in your
                device settings to continues.
              </ThemedText>
            </>
          ) : (
            <ThemedButton
              labelVariant="h3"
              label="Request permission"
              onPress={requestLocationPermission}
              disabled={isLoading}
              loading={isLoading}
            />
          )}
        </ThemedView>
      </ThemedView>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: sizes.xl,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    textAlign: "center",
  },

  description: {
    textAlign: "center",
    maxWidth: 340,
    lineHeight: 17.7,
  },

  settingsHint: {
    textAlign: "center",
    marginTop: sizes.md,
    lineHeight: 16,
  },

  loader: {
    marginTop: sizes.md,
  },
});
