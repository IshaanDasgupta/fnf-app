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
  selected,
  onPress,
}: ListingMarkerProps) {
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  useEffect(() => {
    setTracksViewChanges(true);

    const timer = setTimeout(() => {
      setTracksViewChanges(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selected]);

  return (
    <Marker
      coordinate={{
        latitude,
        longitude,
      }}
      tracksViewChanges={tracksViewChanges}
      onPress={() => onPress(id)}
    >
      <ThemedView style={styles.marker}>
        <ThemedView
          variant={selected ? "accent-primary" : "inverse"}
          padding="xs"
          style={styles.price}
        >
          <ThemedText
            variant="body"
            color={selected ? "foreground.white" : "foreground.inverse"}
          >
            ₹{Math.round(price / 1000)}k
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Marker>
  );
});

const styles = {
  marker: {
    alignItems: "center" as const,
  },

  price: {
    borderRadius: radius.button,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
};
