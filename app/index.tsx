import { useAuth } from "@/hooks/useAuth";
import { navigation } from "@/lib/navigation";
import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function StartupScreen() {
  const { isHydrated, isAuthenticated, basicOnboardingCompleted } = useAuth();

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

  return <Redirect href={navigation.tabs.home} />;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
