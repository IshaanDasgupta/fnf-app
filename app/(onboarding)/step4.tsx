import { navigation } from "@/lib/navigation";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

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
          router.replace(navigation.tabs.home);
        }}
      />
    </View>
  );
}
