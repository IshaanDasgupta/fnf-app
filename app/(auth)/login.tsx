import React from "react";
import { Image, Linking, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { navigation } from "@/lib/navigation";

import { ThemedSafeArea } from "@/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/components/themed-ui/ThemedScrollView";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedButton } from "@/components/themed-ui/ThemedButton";

import { radius } from "@/theme/radius";
import { spacing } from "@/theme/spacing";
import { useColors } from "@/hooks/useColors";
import { useTheme } from "@/hooks/useTheme";

const WELCOME_ILLUSTRATION = require("@/assets/images/welcome-illustration.png");

export default function LoginScreen() {
  const colors = useColors();

  const router = useRouter();

  const handleContinue = () => {
    router.replace(navigation.phone_number);
  };

  const authProviders = [
    {
      label: "Continue with Apple",
      icon: <Ionicons name="logo-apple" size={20} color={colors.white} />,
      variant: "primary" as const,
    },
    {
      label: "Continue with Google",
      icon: (
        <Ionicons name="logo-google" size={18} color={colors.text.primary} />
      ),
      variant: "outline" as const,
    },
    {
      label: "Continue with Phone",
      icon: <Ionicons name="call" size={18} color={colors.text.primary} />,
      variant: "outline" as const,
    },
  ];

  return (
    <ThemedSafeArea>
      <ThemedScrollView padding="lg">
        <ThemedView style={styles.logoRow}>
          <ThemedView variant="secondary" borderRadius="md" padding="sm">
            <Ionicons name="home" size={20} color={colors.primary} />
          </ThemedView>

          <ThemedText variant="h3">FlatMate</ThemedText>
        </ThemedView>

        <ThemedView
          variant="secondary"
          borderRadius="card"
          padding="lg"
          margin="xl"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            source={WELCOME_ILLUSTRATION}
            resizeMode="contain"
            accessibilityLabel="Welcome illustration"
            style={styles.illustration}
          />
        </ThemedView>

        <ThemedView alignItems="center">
          <ThemedText variant="display" align="center">
            Welcome home,{"\n"}before you move in.
          </ThemedText>

          <ThemedView margin="sm" />

          <ThemedText variant="body" color="text.secondary" align="center">
            Meet flatmates who match your rhythm, routine and vibe.
          </ThemedText>
        </ThemedView>

        <ThemedView margin="2xl" gap="md">
          {authProviders.map((provider) => (
            <ThemedButton
              key={provider.label}
              variant={provider.variant}
              fullWidth
              leftIcon={provider.icon}
              onPress={handleContinue}
            >
              {provider.label}
            </ThemedButton>
          ))}
        </ThemedView>

        <ThemedView margin="lg" alignItems="center">
          <ThemedText variant="caption" color="text.tertiary" align="center">
            By continuing you agree to our{" "}
            <ThemedText
              variant="caption"
              color="primary"
              onPress={() => Linking.openURL("https://google.com")}
            >
              Terms
            </ThemedText>
            {" & "}
            <ThemedText
              variant="caption"
              color="primary"
              onPress={() => Linking.openURL("https://google.com")}
            >
              Privacy Policy
            </ThemedText>
          </ThemedText>
        </ThemedView>
      </ThemedScrollView>
    </ThemedSafeArea>
  );
}

const styles = StyleSheet.create({
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  illustration: {
    width: "100%",
    height: 260,
  },
});
