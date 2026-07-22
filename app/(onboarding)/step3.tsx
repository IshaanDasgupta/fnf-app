import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { navigation } from "@/lib/navigation";

export default function Step3Screen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Text>Onboarding Step 3</Text>
      <Button
        title="Finish Step 3"
        onPress={() => router.push(navigation.onboarding.step4)}
      />
    </View>
  );
}
