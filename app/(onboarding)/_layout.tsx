import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { navigation } from "@/lib/navigation";
import { useAuthStore } from "@/stores/auth";

export default function OnboardingLayout() {
  const { isAuthenticated, onboardingCompleted, isHydrated } = useAuthStore();

  if (!isHydrated) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href={navigation.login} />;
  }

  if (onboardingCompleted) {
    return <Redirect href={navigation.tabs.home} />;
  }

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      initialRouteName="step1"
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
