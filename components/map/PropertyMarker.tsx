import { Marker } from "react-native-maps";

import { useResolveThemeColor } from "@/hooks/useResolveThemeColor";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { radius } from "@/theme/radius";
import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ListingMarkerProps } from "@/types/map/listing-marker";

export function PropertyMarker({
  id,
  latitude,
  longitude,
  price,
  selected = false,
  onPress,
}: ListingMarkerProps) {
  return (
    <Marker
      coordinate={{
        latitude,
        longitude,
      }}
      tracksViewChanges={true}
      onPress={() => onPress(id)}
    >
      <ThemedView style={{ alignItems: "center" }}>
        <ThemedView
          variant="inverse"
          padding="xs"
          style={{
            borderRadius: radius.button,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText variant="body" color="foreground.inverse">
            ₹{Math.round(price / 1000)}k
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Marker>
  );
}
