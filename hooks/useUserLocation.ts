import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useUserLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const [permission, setPermission] =
    useState<Location.PermissionStatus | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();

        if (!mounted) {
          return;
        }

        setPermission(status);

        if (status !== Location.PermissionStatus.GRANTED) {
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (mounted) {
          setLocation(currentLocation);
        }
      } catch (error) {
        console.error("Failed to get location:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    location,
    permission,
    isLoading,
  };
}
