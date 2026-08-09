import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";

import { Fraunces_600SemiBold } from "@expo-google-fonts/fraunces";

import { navigation } from "@/lib/navigation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

void SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
