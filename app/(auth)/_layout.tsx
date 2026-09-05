import { LoadingScreen } from "@/src/components/shared/LoadingScreen";
import { useAuth } from "@/src/hooks/useAuth";
import { navigation } from "@/src/lib/navigation";
import { Redirect, Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function AuthLayout() {
  const { isAuthenticated, basicOnboardingCompleted, isHydrated } = useAuth();

  if (!isHydrated) {
    return <LoadingScreen />;
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
