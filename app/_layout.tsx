import { Stack, useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";

import { Fraunces_600SemiBold } from "@expo-google-fonts/fraunces";

import { navigation } from "@/lib/navigation";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Fraunces_600SemiBold,
  });

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", ({ url }) => {
      const parsed = Linking.parse(url);
      const segments = parsed.path?.split("/").filter(Boolean) ?? [];

      if (segments[0] === "property" && segments[1]) {
        router.replace(navigation.property(segments[1]));
      }
    });

    return () => subscription.remove();
  }, [router]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </SafeAreaProvider>
  );
}
