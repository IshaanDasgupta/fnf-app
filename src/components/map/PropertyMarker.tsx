import { Marker } from "react-native-maps";

import { ThemedText } from "@/src/components/themed-ui/ThemedText";
import { ThemedView } from "@/src/components/themed-ui/ThemedView";
import { radius } from "@/src/theme/radius";
import { ListingMarkerProps } from "@/src/types/map/listing-marker";
import { memo, useEffect, useState } from "react";

export const PropertyMarker = memo(function PropertyMarker({
  id,
  latitude,
  longitude,
  price,
  selected = false,
  onPress,
}: ListingMarkerProps) {
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTracksViewChanges(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Marker
      coordinate={{
        latitude,
        longitude,
      }}
      tracksViewChanges={tracksViewChanges}
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
});
