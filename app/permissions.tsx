import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, AppState, Linking, StyleSheet } from "react-native";

import { ThemedButton } from "@/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { sizes } from "@/theme/size";

export default function PermissionScreen() {
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
        console.log(nextState);
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
          <ThemedView style={styles.iconContainer}>
            <Ionicons name="location" size={36} color="#2563eb" />
          </ThemedView>

          <ThemedText variant="title" style={styles.title}>
            Location is required
          </ThemedText>

          <ThemedText
            variant="body"
            color="foreground.secondary"
            style={styles.description}
          >
            Friendly Floors uses your location to show nearby flat listings and
            power map-based listing search.
          </ThemedText>

          <ThemedText
            variant="body"
            color="foreground.secondary"
            style={styles.description}
          >
            Location access is required to use the app.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.footer}>
          {permissionDenied ? (
            <>
              <ThemedButton
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
                device settings to continue using Friendly Floors.
              </ThemedText>
            </>
          ) : (
            <ThemedButton
              label={isLoading ? "Requesting permission..." : "Continue"}
              onPress={requestLocationPermission}
              disabled={isLoading}
            />
          )}

          {isLoading && (
            <ActivityIndicator size="small" style={styles.loader} />
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
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: sizes["2xl"],
    backgroundColor: "#eff6ff",
  },

  title: {
    textAlign: "center",
    marginBottom: sizes.md,
  },

  description: {
    textAlign: "center",
    maxWidth: 340,
    marginBottom: sizes.md,
    lineHeight: 22,
  },

  footer: {
    paddingBottom: sizes.lg,
  },

  settingsHint: {
    textAlign: "center",
    marginTop: sizes.md,
    lineHeight: 20,
  },

  loader: {
    marginTop: sizes.md,
  },
});
