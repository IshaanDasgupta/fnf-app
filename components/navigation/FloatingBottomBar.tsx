import React from "react";
import { StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/themed-ui/ThemedView";
import { ThemedIconButton } from "@/components/themed-ui/ThemedIconButton";
import { radius } from "@/theme/radius";
import { shadows } from "@/theme/shadows";
import { spacing } from "@/theme/spacing";
import ThemedIconText from "@/components/themed-ui/ThemedIconText";

import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import BottomTabItem from "@/components/navigation/BottomBarItem";

const icons = {
  home: {
    active: "home",
    inactive: "home-outline",
  },
  map: {
    active: "map",
    inactive: "map-outline",
  },
  saved: {
    active: "heart",
    inactive: "heart-outline",
  },
  profile: {
    active: "person",
    inactive: "person-outline",
  },
} as const;

export default function FloatingBottomBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <ThemedView
      variant="transparent"
      pointerEvents="box-none"
      style={styles.wrapper}
    >
      <ThemedView
        variant="tertiary"
        borderRadius="phone"
        padding="sm"
        style={styles.container}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;

          const icon = icons[route.name as keyof typeof icons] ?? icons.home;

          const label =
            descriptors[route.key].options.title ??
            descriptors[route.key].options.tabBarLabel ??
            route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <BottomTabItem
              key={route.key}
              focused={focused}
              label={typeof label === "string" ? label : route.name}
              activeIcon={icon.active}
              inactiveIcon={icon.inactive}
              onPress={onPress}
            />
          );
        })}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing["3xl"],
    alignItems: "center",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
    ...shadows.lg,
  },
});
