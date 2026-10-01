import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { sizes } from "@/src/theme/size";

interface ToggleFilterCardProps {
  title: string;
  subtitle: string;
  iconName: keyof typeof Ionicons.glyphMap;
  active: boolean;
  onToggle: () => void;
  iconTintColor?: string;
}

export default function ToggleFilterCard({
  title,
  subtitle,
  iconName,
  active,
  onToggle,
  iconTintColor = "#4DA4E8",
}: ToggleFilterCardProps) {
  return (
    <Pressable onPress={onToggle}>
      <ThemedView
        variant="tertiary"
        borderRadius="card"
        style={[styles.card, active && styles.cardActive]}
      >
        <ThemedView
          style={[
            styles.iconCircle,
            {
              backgroundColor: active
                ? iconTintColor
                : "rgba(77, 164, 232, 0.15)",
            },
          ]}
        >
          <Ionicons
            name={iconName}
            size={22}
            color={active ? "#161B24" : iconTintColor}
          />
        </ThemedView>

        <ThemedView style={styles.texts}>
          <ThemedText variant="title" style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText
            variant="caption"
            color="foreground.secondary"
            style={styles.subtitle}
          >
            {subtitle}
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={[
            styles.switchToggle,
            active ? styles.switchToggleOn : styles.switchToggleOff,
          ]}
        >
          <ThemedView
            style={[
              styles.switchThumb,
              active ? styles.switchThumbOn : styles.switchThumbOff,
            ]}
          />
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: sizes.lg,
    gap: sizes.md,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  cardActive: {
    borderColor: "rgba(77, 164, 232, 0.6)",
    backgroundColor: "rgba(77, 164, 232, 0.06)",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  texts: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 2,
    fontSize: 8.8,
  },
  switchToggle: {
    width: 46,
    height: 26,
    borderRadius: 13,
    padding: 2,
    justifyContent: "center",
  },
  switchToggleOff: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  switchToggleOn: {
    backgroundColor: "#4DA4E8",
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  switchThumbOff: {
    alignSelf: "flex-start",
  },
  switchThumbOn: {
    alignSelf: "flex-end",
  },
});
