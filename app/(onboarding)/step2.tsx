import { navigation } from "@/src/lib/navigation";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Step2Screen() {
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
      <Text>Onboarding Step 2</Text>
      <Button
        title="Finish Step 2"
        onPress={() => router.push(navigation.onboarding.step3)}
      />
    </View>
  );
}
