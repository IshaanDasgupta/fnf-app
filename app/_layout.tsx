import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";

import { Fraunces_600SemiBold } from "@expo-google-fonts/fraunces";

import { navigation } from "@/src/lib/navigation";

import { useToastConfig } from "@/src/lib/toast-config";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

void SplashScreen.preventAutoHideAsync();

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

const queryClient = new QueryClient();

const toastConfig = useToastConfig();

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
    const handleDeepLink = (url: string) => {
      const parsed = Linking.parse(url);
      const segments = parsed.path?.split("/").filter(Boolean) ?? [];

      if (segments.length === 2 && segments[0] === "property" && segments[1]) {
        router.replace(navigation.property(segments[1]));
      }
    };

    void Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
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
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}
