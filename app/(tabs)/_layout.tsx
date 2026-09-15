import FloatingBottomBar from "@/src/components/navigation/FloatingBottomBar";
import { LoadingScreen } from "@/src/components/shared/LoadingScreen";
import { useAuth } from "@/src/hooks/useAuth";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { navigation } from "@/src/lib/navigation";
import * as Location from "expo-location";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const { isAuthenticated, basicOnboardingCompleted, isHydrated } = useAuth();

  const { permission, city, isLoading: isLocationLoading } = useUserLocation();

  if (!isHydrated || isLocationLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect href={navigation.auth.login} />;
  }

  if (!basicOnboardingCompleted) {
    return <Redirect href={navigation.onboarding.basic} />;
  }

  if (permission !== Location.PermissionStatus.GRANTED) {
    return <Redirect href={navigation.standalone.permissions} />;
  }

  if (!city) {
    return <Redirect href={navigation.standalone.citySelection} />;
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
