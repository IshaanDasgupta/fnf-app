import { useUserLocation } from "@/src/hooks/useUserLocation";

import MapContent from "@/src/components/map/MapContent";
import { LoadingErrorScreen } from "@/src/components/shared/LoadingErrorScreen";
import { LoadingScreen } from "@/src/components/shared/LoadingScreen";

export default function MapScreen() {
  const {
    location,
    isLoading: isLocationLoading,
    isRefreshing,
    refreshLocation,
  } = useUserLocation();

  if (isLocationLoading) {
    return <LoadingScreen />;
  }

  if (!location) {
    return (
      <LoadingErrorScreen
        title="Location unavailable"
        message={`We couldn’t connect to our servers.\n Please check your internet connection and try again.`}
        retryLabel="Try Again"
        onRetry={refreshLocation}
        retryLoading={isRefreshing}
      />
    );
  }

  return (
    <MapContent latitude={location.latitude} longitude={location.longitude} />
  );
}
