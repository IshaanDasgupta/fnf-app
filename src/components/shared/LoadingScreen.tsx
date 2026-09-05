import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({
  message = "Getting things ready...",
}: LoadingScreenProps) {
  const rotation = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    rotateAnimation.start();
    pulseAnimation.start();

    return () => {
      rotateAnimation.stop();
      pulseAnimation.stop();
    };
  }, [rotation, pulse]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ThemedSafeArea>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.loaderWrapper}>
          {/* Rotating ring */}
          <Animated.View
            style={[
              styles.ring,
              {
                transform: [{ rotate }],
              },
            ]}
          />

          {/* Pulsing logo */}
          <Animated.View
            style={{
              transform: [{ scale: pulse }],
            }}
          >
            <ThemedView
              variant="accent-primary"
              borderRadius="md"
              style={styles.logo}
            >
              <Ionicons name="home" size={28} color="white" />
            </ThemedView>
          </Animated.View>
        </ThemedView>

        <ThemedText variant="h3">FlatMate</ThemedText>

        <ThemedText
          variant="body"
          color="foreground.secondary"
          style={styles.message}
        >
          {message}
        </ThemedText>
      </ThemedView>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loaderWrapper: {
    width: 92,
    height: 92,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  ring: {
    position: "absolute",
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },

  logo: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  message: {
    marginTop: 8,
  },
});
