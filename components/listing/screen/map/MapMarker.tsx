import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { useResolveThemeColor } from "@/hooks/useResolveThemeColor";
import { radius } from "@/theme/radius";
import { sizes } from "@/theme/size";
import { ThemedView } from "@/components/themed-ui/ThemedView";

export function MapMarker() {
  const background = useResolveThemeColor("background.inverse");
  const foreground = useResolveThemeColor("foreground.inverse");

  const markerSize = sizes["3xl"];

  return (
    <ThemedView style={{ alignItems: "center" }}>
      <ThemedView
        variant="inverse"
        style={{
          width: markerSize,
          height: markerSize,
          borderRadius: radius.button,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="home"
          size={markerSize * 0.5}
          color={foreground}
        />
      </ThemedView>
    </ThemedView>
  );
}
