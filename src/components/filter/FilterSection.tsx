import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

export interface FilterSectionProps {
  title: string;
  subtitle?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconTintBg?: string;
  iconTintColor?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function FilterSection({
  title,
  subtitle,
  iconName,
  iconTintBg,
  iconTintColor,
  icon,
  badge,
  children,
  style,
}: FilterSectionProps) {
  const headerIcon = iconName ? (
    <Ionicons
      name={iconName}
      size={18}
      color={iconTintColor ?? "#4DA4E8"}
    />
  ) : (
    icon
  );

  return (
    <ThemedView
      variant="tertiary"
      style={[styles.container, { borderRadius: radius.card }, style]}
    >
      <ThemedView style={styles.headerRow}>
        <ThemedView style={styles.titleWithIcon}>
          {headerIcon && (
            <ThemedView
              style={[
                styles.iconCircle,
                { backgroundColor: iconTintBg ?? "rgba(77, 164, 232, 0.12)" },
              ]}
            >
              {headerIcon}
            </ThemedView>
          )}

          <ThemedView style={styles.titleTexts}>
            <ThemedText variant="title" style={styles.title}>
              {title}
            </ThemedText>
            {subtitle && (
              <ThemedText
                variant="caption"
                color="foreground.secondary"
                style={styles.subtitle}
              >
                {subtitle}
              </ThemedText>
            )}
          </ThemedView>
        </ThemedView>

        {badge !== undefined && Number(badge) > 0 && (
          <ThemedView
            variant="accent-primary"
            borderRadius="button"
            style={styles.badge}
          >
            <ThemedText
              variant="label"
              color="foreground.black"
              style={styles.badgeText}
            >
              {badge}
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: sizes.lg,
    marginHorizontal: sizes.lg,
    marginVertical: sizes.xs,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleWithIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.md,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  titleTexts: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
  },
  badge: {
    paddingHorizontal: sizes.sm,
    paddingVertical: 3,
    minWidth: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  content: {
    marginTop: sizes.md,
  },
});

export default FilterSection;
