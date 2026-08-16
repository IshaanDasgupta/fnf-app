import { useLocationStore } from "@/src/stores/location";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";

export function useUserLocation() {
  const location = useLocationStore((state) => state.location);
  const city = useLocationStore((state) => state.city);
  const setLocation = useLocationStore((state) => state.setLocation);

  const initialLocation = useRef(location);

  const [permission, setPermission] =
    useState<Location.PermissionStatus | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let subscription: Location.LocationSubscription | null = null;

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

        // Only check the location that existed when the hook initialized.
        if (!initialLocation.current) {
          const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

          if (!mounted) {
            return;
          }

          setLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });
        }

        // Start the watcher once.
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            distanceInterval: 1000,
          },
          (newLocation) => {
            if (!mounted) {
              return;
            }

            setLocation({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            });
          },
        );
      } catch (error) {
        console.error("Failed to initialize location:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
      subscription?.remove();
    };
  }, [setLocation]);

  return {
    location,
    city,
    permission,
    isLoading,
  };
}
