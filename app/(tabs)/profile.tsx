import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { navigation } from "@/lib/navigation";
import { useAuthStore } from "@/stores/auth";

export default function ProfileScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace(navigation.login);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Text>Profile Screen</Text>
      <Text onPress={handleLogout}>Logout</Text>
    </View>
  );
}
