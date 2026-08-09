import { Marker } from "react-native-maps";

import { radius } from "@/theme/radius";

import { ThemedText } from "@/components/themed-ui/ThemedText";
import { ThemedView } from "@/components/themed-ui/ThemedView";
import { memo, useEffect, useState } from "react";

interface ClusterMarkerProps {
  latitude: number;
  longitude: number;
  count: number;
  onPress?(): void;
}

export const ClusterMarker = memo(function ClusterMarker({
  latitude,
  longitude,
  count,
  onPress,
}: ClusterMarkerProps) {
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
      onPress={onPress}
      tracksViewChanges={tracksViewChanges}
    >
      <ThemedView
        variant="inverse"
        padding="sm"
        style={{
          minWidth: 36,
          minHeight: 36,
          borderRadius: radius.button,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText variant="body" color="foreground.inverse">
          {count}
        </ThemedText>
      </ThemedView>
    </Marker>
  );
});
