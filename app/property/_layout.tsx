import { useAuth } from "@/src/hooks/useAuth";
import { navigation } from "@/src/lib/navigation";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function PropertyLayout() {
  const { isAuthenticated, basicOnboardingCompleted, isHydrated } = useAuth();

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

  if (!basicOnboardingCompleted) {
    return <Redirect href={navigation.onboarding.basic} />;
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
