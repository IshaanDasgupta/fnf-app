import ThemedText from "@/components/themed-ui/ThemedText";
import ThemedView from "@/components/themed-ui/ThemedView";

export default function SplashScreen() {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Splash</ThemedText>
    </ThemedView>
  );
}
