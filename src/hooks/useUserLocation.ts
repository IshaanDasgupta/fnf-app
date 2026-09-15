import { useLocationStore } from "@/src/stores/location";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export function useUserLocation() {
  const location = useLocationStore((state) => state.location);
  const city = useLocationStore((state) => state.city);
  const setLocation = useLocationStore((state) => state.setLocation);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [permission, setPermission] =
    useState<Location.PermissionStatus | null>(null);

  const refreshLocation = async () => {
    try {
      setIsRefreshing(true);

      const { status } = await Location.getForegroundPermissionsAsync();

      if (status !== Location.PermissionStatus.GRANTED) {
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      setLocation(coords);

      return coords;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Couldn't refresh location",
        text2: "Please try again in a moment.",
      });

      console.error("Failed to refresh location:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    let subscription: Location.LocationSubscription | null = null;

    const initialize = async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();

        if (!mounted) return;

        setPermission(status);

        if (status !== Location.PermissionStatus.GRANTED) {
          return;
        }

        if (location) {
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (!mounted) return;

        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            distanceInterval: 1000,
          },
          (newLocation) => {
            if (!mounted) return;

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
    isRefreshing,
    refreshLocation,
  };
}
