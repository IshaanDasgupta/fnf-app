import { LoadingScreen } from "@/src/components/shared/LoadingScreen";
import { useAuth } from "@/src/hooks/useAuth";
import { navigation } from "@/src/lib/navigation";
import { Redirect, Stack } from "expo-router";

export default function PropertyLayout() {
  const { isAuthenticated, basicOnboardingCompleted, isHydrated } = useAuth();

  if (!isHydrated) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect href={navigation.auth.login} />;
  }

  if (!basicOnboardingCompleted) {
    return <Redirect href={navigation.onboarding.basic} />;
  }

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    />
  );
}
