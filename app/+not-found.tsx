import { navigation } from "@/src/lib/navigation";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  useEffect(() => {
    router.replace(navigation.splash);
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Not Found</Text>
    </View>
  );
}
