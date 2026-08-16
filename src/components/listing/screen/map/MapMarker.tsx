import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { useResolveThemeColor } from "@/src/hooks/theme/useResolveThemeColor";
import { radius } from "@/src/theme/radius";
import { sizes } from "@/src/theme/size";

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
