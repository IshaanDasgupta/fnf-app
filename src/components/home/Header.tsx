import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

import { ThemedIconButton } from "@/src/components/themed-ui/ThemedIconButton";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

import CitySelectionInput from "@/src/components/shared/CitySelectionInput";
import { useAuth } from "@/src/hooks/useAuth";
import { useLocationStore } from "@/src/stores/location";
import { sizes } from "@/src/theme/size";

export function HomeHeader() {
  const { user } = useAuth();
  const city = useLocationStore((state) => state.city);

  const [showCitySelection, setShowCitySelection] = useState(false);

  const animation = useRef(new Animated.Value(0)).current;

  const firstName = user?.name?.trim().split(/\s+/)[0] ?? "";
  const displayName =
    firstName.length > 14 ? `${firstName.slice(0, 14)}…` : firstName;

  const cityLabel = city
    ? city.charAt(0).toUpperCase() + city.slice(1)
    : "Select city";

  const openCitySelection = () => {
    animation.setValue(0);
    setShowCitySelection(true);

    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const closeCitySelection = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowCitySelection(false);
    });
  };

  return (
    <ThemedView style={styles.container} gap="md">
      {showCitySelection && (
        <Animated.View
          style={[
            styles.citySelection,
            {
              opacity: animation,
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <CitySelectionInput onSelect={closeCitySelection} />
        </Animated.View>
      )}

      <ThemedView style={styles.headerContainer}>
        <ThemedView style={styles.leftContent}>
          {!showCitySelection && (
            <Pressable onPress={openCitySelection} style={styles.cityButton}>
              <ThemedText variant="title" color="foreground.secondary">
                {cityLabel}
              </ThemedText>

              <ThemedText variant="caption" color="accent.primary">
                Change
              </ThemedText>
            </Pressable>
          )}

          <ThemedView style={styles.titleContainer}>
            <ThemedText variant="display" color="foreground.primary">
              {`Hi ${displayName}, `}
            </ThemedText>

            <ThemedText variant="display" color="accent.primary">
              welcome home.
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {user?.avatar ? (
          <ThemedIconButton
            variant="secondary"
            size="lg"
            style={styles.avatar}
            icon={user?.avatar}
            disabled
          />
        ) : (
          <ThemedView style={styles.avatarWrapper}>
            <ThemedView
              variant="inverse"
              style={styles.avatar}
              padding="md"
              borderRadius="button"
            >
              <ThemedText variant="h3" color="foreground.inverse">
                {firstName.charAt(0).toUpperCase()}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },

  citySelection: {
    overflow: "hidden",
  },

  headerContainer: {
    flexDirection: "row",
    marginBottom: sizes.xl,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  leftContent: {
    flex: 1,
  },

  cityButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.sm,
  },

  titleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: sizes.xs,
    paddingRight: sizes.md,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeHeader;
