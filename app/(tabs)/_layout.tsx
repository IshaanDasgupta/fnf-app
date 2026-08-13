import FloatingBottomBar from "@/components/navigation/FloatingBottomBar";
import { useAuth } from "@/hooks/useAuth";
import { useUserLocation } from "@/hooks/useUserLocation";
import { navigation } from "@/lib/navigation";
import * as Location from "expo-location";
import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function TabsLayout() {
  const { isAuthenticated, basicOnboardingCompleted, isHydrated } = useAuth();

  const { permission, isLoading: isLocationLoading } = useUserLocation();

  if (!isHydrated || isLocationLoading) {
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

  if (permission !== Location.PermissionStatus.GRANTED) {
    return <Redirect href={navigation.permissions} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#64748b",
        animation: "shift",
      }}
      tabBar={(props) => <FloatingBottomBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Home", href: navigation.tabs.home }}
      />
      <Tabs.Screen
        name="map"
        options={{ title: "Map", href: navigation.tabs.map }}
      />
      <Tabs.Screen
        name="saved"
        options={{ title: "Saved", href: navigation.tabs.saved }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", href: navigation.tabs.profile }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
