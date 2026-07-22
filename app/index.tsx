import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { navigation } from "@/lib/navigation";
import { useAuthStore } from "@/stores/auth";

export default function StartupScreen() {
  const { isHydrated, isAuthenticated, onboardingCompleted } = useAuthStore();

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

  if (!onboardingCompleted) {
    return <Redirect href={navigation.onboarding.step1} />;
  }

  return <Redirect href={navigation.tabs.home} />;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
