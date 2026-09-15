import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

import CitySelectionInput from "@/src/components/shared/CitySelectionInput";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useLocationStore } from "@/src/stores/location";

export function HomeHeader() {
  const city = useLocationStore((state) => state.city);

  const [showCitySelection, setShowCitySelection] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const cityLabel = city
    ? city.charAt(0).toUpperCase() + city.slice(1)
    : "Select city";

  const openCitySelection = () => {
    animation.setValue(0);
    setShowCitySelection(true);

    Animated.timing(animation, {
      toValue: 1,
      duration: 250,
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
    <ThemedView style={styles.container}>
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

      {!showCitySelection && (
        <ThemedView style={styles.header}>
          <ThemedView style={styles.cityInfo}>
            <ThemedText variant="thinTitle" color="foreground.secondary">
              Browsing in
            </ThemedText>

            <ThemedText variant="title">{cityLabel}</ThemedText>
          </ThemedView>

          <Pressable onPress={openCitySelection} style={styles.cityButton}>
            <ThemedText variant="caption" color="accent.primary">
              Change
            </ThemedText>
          </Pressable>
        </ThemedView>
      )}
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  cityInfo: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },

  cityButton: {
    alignItems: "center",
  },
});

export default HomeHeader;
