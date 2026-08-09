import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Linking, StyleSheet } from "react-native";

import { navigation } from "@/lib/navigation";

import { ThemedButton } from "@/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/components/themed-ui/ThemedScrollView";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";

import Spacer from "@/components/themed-ui/Spacer";
import { useTheme } from "@/hooks/useTheme";
import { sizes } from "@/theme/size";

const WELCOME_ILLUSTRATION = require("@/assets/images/welcome-illustration.png");

export default function LoginScreen() {
  const { colors } = useTheme();

  const router = useRouter();

  const handleContinue = () => {
    router.replace(navigation.phone_number);
  };

  const authProviders = [
    {
      label: "Continue with Apple",
      icon: <Ionicons name="logo-apple" size={24} />,
      variant: "accent-secondary" as const,
    },
    {
      label: "Continue with Google",
      icon: (
        <Ionicons
          name="logo-google"
          size={22}
          color={colors.foreground.primary}
        />
      ),
      variant: "tertiary" as const,
    },
    {
      label: "Continue with Phone",
      icon: <Ionicons name="call" size={22} />,
      variant: "tertiary" as const,
    },
  ];

  return (
    <ThemedSafeArea>
      <ThemedScrollView padding="lg">
        <ThemedView style={styles.logoRow}>
          <ThemedView variant="accent-primary" borderRadius="md" padding="sm">
            <Ionicons name="home" size={20} color={colors.foreground.white} />
          </ThemedView>

          <ThemedText variant="h3">FlatMate</ThemedText>
        </ThemedView>

        <ThemedView
          variant="secondary"
          borderRadius="card"
          padding="lg"
          margin="xl"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={WELCOME_ILLUSTRATION}
            resizeMode="contain"
            accessibilityLabel="Welcome illustration"
            style={styles.illustration}
          />
        </ThemedView>

        <ThemedView style={{ alignItems: "center" }}>
          <ThemedText variant="display" style={{ textAlign: "center" }}>
            Welcome home,{"\n"}before you move in.
          </ThemedText>

          <Spacer size="lg" />

          <ThemedText
            variant="body"
            color="foreground.secondary"
            style={{ textAlign: "center" }}
          >
            Meet flatmates who match your rhythm,{"\n"} routine and vibe.
          </ThemedText>
        </ThemedView>

        <ThemedView margin="2xl" gap="md">
          {authProviders.map((provider) => (
            <ThemedButton
              key={provider.label}
              variant={provider.variant}
              label={provider.label}
              labelVariant="title"
              leftIcon={provider.icon}
              onPress={handleContinue}
            />
          ))}
        </ThemedView>

        <ThemedView margin="lg" style={{ alignItems: "center" }}>
          <ThemedText
            variant="caption"
            color="foreground.tertiary"
            style={{ textAlign: "center" }}
          >
            By continuing you agree to our{" "}
            <ThemedText
              variant="caption"
              color="accent.primary"
              onPress={() => Linking.openURL("https://google.com")}
            >
              Terms
            </ThemedText>
            {" & "}
            <ThemedText
              variant="caption"
              color="accent.primary"
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
    gap: sizes.sm,
  },

  illustration: {
    width: "100%",
    height: 260,
  },
});
