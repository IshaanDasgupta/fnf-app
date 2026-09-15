import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/src/components/themed-ui/ThemedScrollView";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { CITIES_CONFIG } from "@/src/constants/cities";
import { useTheme } from "@/src/hooks/theme/useTheme";
import { useLocationStore } from "@/src/stores/location";
import { radius } from "@/src/theme/radius";
import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";

export default function CitySelectionScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const city = useLocationStore((state) => state.city);
  const setCity = useLocationStore((state) => state.setCity);

  const handleContinue = () => {
    if (!city) {
      return;
    }

    router.replace("/(tabs)/home");
  };

  return (
    <ThemedSafeArea>
      <ThemedScrollView
        padding="lg"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView margin="2xl" gap="sm" style={{ alignItems: "center" }}>
          <ThemedText variant="display" style={{ textAlign: "center" }}>
            Where are you looking?
          </ThemedText>

          <ThemedText
            variant="body"
            color="foreground.secondary"
            style={{ textAlign: "center" }}
          >
            Choose the city where you want to find your next home.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.cityContainer}>
          {CITIES_CONFIG.map((item) => {
            const selected = city === item.id;
            const CityIcon = item.icon;

            return (
              <Pressable key={item.id} onPress={() => setCity(item.id)}>
                <ThemedView
                  variant={selected ? "primary" : "tertiary"}
                  borderRadius="card"
                  padding="lg"
                  style={[
                    styles.cityItem,
                    selected && {
                      ...styles.cityItemSelected,
                      borderColor: colors.accent.primary,
                      ...shadows.lg,
                    },
                  ]}
                >
                  <ThemedView
                    variant="secondary"
                    style={[
                      styles.iconContainer,
                      selected && {
                        backgroundColor: `${colors.accent.primary}1F`,
                      },
                    ]}
                  >
                    <CityIcon
                      width={42 * item.iconScale}
                      height={42 * item.iconScale}
                      color={
                        selected
                          ? colors.accent.primary
                          : colors.foreground.primary
                      }
                    />
                  </ThemedView>

                  <ThemedView style={styles.cityInfo}>
                    <ThemedText variant="h3">{item.label}</ThemedText>
                  </ThemedView>

                  {selected && (
                    <Ionicons
                      name="checkmark-circle"
                      color={colors.accent.primary}
                      size={24}
                    />
                  )}
                </ThemedView>
              </Pressable>
            );
          })}
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <ThemedButton
            label="Continue"
            labelVariant="h3"
            disabled={!city}
            onPress={handleContinue}
          />
        </ThemedView>
      </ThemedScrollView>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },

  eyebrow: {
    fontWeight: "700",
    letterSpacing: 1.4,
  },

  title: {
    marginVertical: sizes.sm,
  },

  cityContainer: {
    gap: sizes.md,
  },

  cityItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  cityItemSelected: {
    borderWidth: 1,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: radius.card,
    alignItems: "center",
    justifyContent: "center",
  },

  cityInfo: {
    flex: 1,
    marginLeft: sizes.md,
    gap: sizes.xs,
  },

  buttonContainer: {
    marginTop: "auto",
    paddingTop: sizes["2xl"],
  },
});
