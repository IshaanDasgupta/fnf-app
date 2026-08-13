import { useAuth } from "@/hooks/useAuth";
import { navigation } from "@/lib/navigation";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function AuthLayout() {
  const { isAuthenticated, basicOnboardingCompleted, isHydrated } = useAuth();

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
          basicOnboardingCompleted
            ? navigation.tabs.home
            : navigation.onboarding.basic
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
