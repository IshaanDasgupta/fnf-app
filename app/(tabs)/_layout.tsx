import FloatingBottomBar from "@/src/components/navigation/FloatingBottomBar";
import { useAuth } from "@/src/hooks/useAuth";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { navigation } from "@/src/lib/navigation";
import { useLocationStore } from "@/src/stores/location";
import * as Location from "expo-location";
import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function TabsLayout() {
  const { isAuthenticated, basicOnboardingCompleted, isHydrated } = useAuth();

  const { permission, isLoading: isLocationLoading } = useUserLocation();

  const location = useLocationStore((state) => state.location);

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

  // Permission hasn't been granted
  if (permission !== Location.PermissionStatus.GRANTED) {
    return <Redirect href={navigation.permissions} />;
  }

  // Permission granted but we don't have a location yet
  if (!location) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
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
