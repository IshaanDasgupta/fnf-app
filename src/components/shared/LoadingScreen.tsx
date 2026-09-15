import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet } from "react-native";

import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { radius } from "@/src/theme/radius";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({
  message = "Getting things ready...",
}: LoadingScreenProps) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
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

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [pulse]);

  return (
    <ThemedSafeArea>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.loaderWrapper}>
          <Animated.View
            style={{
              transform: [{ scale: pulse }],
            }}
          >
            <Image
              source={require("@/assets/icons/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
        </ThemedView>

        <ThemedText variant="h3">Friendly Floors</ThemedText>

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

  logo: {
    width: 72,
    height: 72,
    borderRadius: radius.card,
  },

  message: {
    marginTop: 8,
  },
});
