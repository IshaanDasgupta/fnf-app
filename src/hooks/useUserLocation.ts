import { navigation } from "@/src/lib/navigation";
import { useLocationStore } from "@/src/stores/location";
import * as Location from "expo-location";
import { router } from "expo-router";
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

  const ensurePermission =
    async (): Promise<Location.PermissionStatus> => {
      const current = await Location.getForegroundPermissionsAsync();

      if (current.status === Location.PermissionStatus.GRANTED) {
        setPermission(current.status);
        return current.status;
      }

      const requested = await Location.requestForegroundPermissionsAsync();
      setPermission(requested.status);
      return requested.status;
    };

  const refreshLocation = async () => {
    try {
      setIsRefreshing(true);

      const status = await ensurePermission();

      if (status !== Location.PermissionStatus.GRANTED) {
        router.replace(navigation.standalone.permissions);
        return null;
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
        const status = await ensurePermission();

        if (!mounted) return;

        if (status !== Location.PermissionStatus.GRANTED) {
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
            timeInterval: 60000,
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
