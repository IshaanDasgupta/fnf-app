import { Ionicons } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  PixelRatio,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";

import { googleLogin } from "@/src/api/auth";
import Spacer from "@/src/components/themed-ui/Spacer";
import { ThemedButton } from "@/src/components/themed-ui/ThemedButton";
import { ThemedSafeArea } from "@/src/components/themed-ui/ThemedSafeArea";
import { ThemedScrollView } from "@/src/components/themed-ui/ThemedScrollView";
import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";

import { API_BASE_URL, ENDPOINTS } from "@/src/constants/endpoints";
import { navigation } from "@/src/lib/navigation";
import { useAuthStore } from "@/src/stores/auth";
import { shadows } from "@/src/theme/shadows";
import { sizes } from "@/src/theme/size";

const WELCOME_ILLUSTRATION = require("@/assets/images/welcome-illustration.png");

export default function LoginScreen() {
  const router = useRouter();

  console.log({
    fontScale: PixelRatio.getFontScale(),
    width: Dimensions.get("window").width,
  });
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  const handleContinueWithGoogle = async () => {
    if (isGoogleLoading) return;

    setIsGoogleLoading(true);

    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();

      if (response.type !== "success") {
        throw new Error("Google sigin did not work");
      }

      const { idToken } = response.data;

      if (!idToken) {
        throw new Error("Google did not return an ID token");
      }

      const { user, accessToken, refreshToken, refreshExpiresAt } =
        await googleLogin(idToken);

      login(user, accessToken, refreshToken, refreshExpiresAt);

      if (user.basicOnboardingCompleted) {
        router.replace(navigation.tabs.home);
      } else {
        router.replace(navigation.onboarding.basic);
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Couldn't sign in with Google",
        text2: "Please try again.",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleContinueWithPhone = () => {
    router.push(navigation.auth.phone_number);
  };

  const authProviders = [
    {
      label: "Continue with Google",
      icon: <Ionicons name="logo-google" size={22} />,
      variant: "inverse" as const,
      onPress: handleContinueWithGoogle,
      loading: isGoogleLoading,
    },
    {
      label: "Continue with Phone",
      icon: <Ionicons name="call" size={22} />,
      variant: "secondary" as const,
      onPress: handleContinueWithPhone,
      loading: false,
    },
  ];

  return (
    <ThemedSafeArea>
      <ThemedScrollView
        padding="lg"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
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
              onPress={provider.onPress}
              loading={provider.loading}
              disabled={isGoogleLoading}
              style={{ ...shadows.lg }}
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
              onPress={() =>
                Linking.openURL(`${API_BASE_URL}${ENDPOINTS.TERMS}`)
              }
            >
              Terms
            </ThemedText>
            {" & "}
            <ThemedText
              variant="caption"
              color="accent.primary"
              onPress={() =>
                Linking.openURL(`${API_BASE_URL}${ENDPOINTS.PRIVACY}`)
              }
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
