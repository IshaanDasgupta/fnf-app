import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useUserLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  useEffect(() => {
    Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    }).then(setLocation);
  }, []);

  return location;
}
