import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { navigation } from "@/lib/navigation";
import { useAuthStore } from "@/stores/auth";

export default function Step4Screen() {
  const router = useRouter();
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Text>Onboarding Step 4</Text>
      <Button
        title="Finish Onboarding"
        onPress={() => {
          completeOnboarding();
          router.replace(navigation.tabs.home);
        }}
      />
    </View>
  );
}
