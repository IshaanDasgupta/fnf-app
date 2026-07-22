import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { navigation } from "@/lib/navigation";
import { useAuthStore } from "@/stores/auth";

export default function AuthLayout() {
  const { isAuthenticated, onboardingCompleted, isHydrated } = useAuthStore();

  if (!isHydrated) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isAuthenticated) {
    return (
      <Redirect
        href={
          onboardingCompleted
            ? navigation.tabs.home
            : navigation.onboarding.step1
        }
      />
    );
  }

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
